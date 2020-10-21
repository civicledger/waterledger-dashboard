import axios from "axios";
import { parseISO } from "date-fns";
import { getInstanceIdentifier } from "../utils/ethUtils";
import ContractInstanceLoader from "../utils/ContractInstanceLoader";

require("dotenv").config();

axios.defaults.baseURL = process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL;
axios.defaults.headers.common["X-Scheme"] = getInstanceIdentifier();
axios.defaults.headers.common["Authorization"] = `bearer ${localStorage.getItem("jwToken")}`;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("jwToken");
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(function (response) {
  if (response.data.trades) {
    response.data.trades = response.data.trades.map(trade => {
      trade.createdAt = parseISO(trade.createdAt);
      trade.deletedAt = parseISO(trade.deletedAt);
      trade.struckAt = parseISO(trade.struckAt);
      trade.updatedAt = parseISO(trade.updatedAt);
      return trade;
    });
  }

  if (response.data.orders) {
    response.data.orders = response.data.orders.map(order => {
      order.createdAt = parseISO(order.createdAt);
      order.deletedAt = parseISO(order.deletedAt);
      order.updatedAt = parseISO(order.updatedAt);
      return order;
    });
  }

  if (response.data.liabilities) {
    response.data.liabilities = response.data.liabilities.map(liability => {
      liability.createdAt = parseISO(liability.createdAt);
      liability.deletedAt = parseISO(liability.deletedAt);
      liability.updatedAt = parseISO(liability.updatedAt);
      return liability;
    });
  }

  return response;
});

const instanceManager = new ContractInstanceLoader();

export default class BaseService {
  axios = axios;

  async getAllEvents() {
    await this.loadContract(this.contractName);
    return this.wrapper.events;
  }

  async getPastEvents() {
    await this.loadContract(this.contractName);
    const rawEvents = await this.wrapper.web3Contract.getPastEvents("allEvents", { fromBlock: 0 });

    return Promise.all(
      rawEvents.map(async raw => {
        let { address, transactionHash, returnValues, event, blockNumber } = raw;

        returnValues = Object.entries(returnValues)
          .filter(([key]) => isNaN(key))
          .map(([key, value]) => ({ key, value }));

        const { timestamp } = await this.wrapper.web3.eth.getBlock(blockNumber);
        return { event, address, transactionHash, returnValues, contract: this.contractName, time: new Date(timestamp * 1000) };
      })
    );
  }

  loadContract = async () => {
    const instance = await instanceManager.getDeployment(this.deploymentName);
    this.contract = instance.proxyContract;
    this.wrapper = instance;
  };
}
