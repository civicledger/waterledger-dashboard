import { getInstanceIdentifier } from "../utils/ethUtils";
import { wrap } from "../utils/ContractWrapper";
import axios from "axios";
require("dotenv").config();

const apiUrl = `${process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL}api/zones/${getInstanceIdentifier()}`;

export default class ZonesService {
  contract = null;

  getZoneBalanceFor = async (address, zoneIndex) => {
    await this.loadContract();
    return await this.contract[zoneIndex].web3Contract.methods.balanceOf(address).call();
  };

  loadContract = async () => {
    if (this.contract) return this.contract;
    const { data } = await axios.get(apiUrl);
    const { abi, deployments } = data;
    this.contract = deployments.map(d => wrap(abi, d.address));
  };
}
