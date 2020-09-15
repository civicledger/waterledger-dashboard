import axios from "axios";

import { getInstanceIdentifier } from "../utils/ethUtils";
import { loadInstance } from "../utils/ContractInstanceLoader";

require("dotenv").config();

const deployedContractJsonUrl = process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL;

export default class LicencesService {
  contractName = "Licences";

  async apiGetLicenceByWaterAccountId(waterAccountId) {
    const params = { "waterAccounts.waterAccountId": waterAccountId, scheme: getInstanceIdentifier() };
    const { data } = await axios.get(`${deployedContractJsonUrl}api/licences`, { params });
    return { licence: data.licences[0] };
  }

  async apiGetLicence(id) {
    const { data } = await axios.get(`${deployedContractJsonUrl}api/licences/${id}`);
    return data;
  }

  async apiActivateLicence(id, licence) {
    const patchData = { licence: { ...licence, identifier: getInstanceIdentifier(), migrated: true } };

    await axios.patch(`${deployedContractJsonUrl}api/licences/${id}`, patchData);
  }

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

  async getWaterAccounts() {
    const waterAccountId = localStorage.getItem("wlWaterAccount");

    if (!waterAccountId) {
      return [];
    }
    await this.loadContract("Licences");

    const licenceIndex = await this.contract.getLicenceIndexForWaterAccountId(waterAccountId);
    const waterAccounts = await this.contract.getWaterAccountsForLicence(licenceIndex);

    return waterAccounts.sort((a, b) => Math.sign(a.zoneIndex - b.zoneIndex));
  }

  loadContract = async (contractName, identifier = false) => {
    if (this.contract) return;

    if (!identifier) {
      identifier = getInstanceIdentifier();
    }
    const instance = await loadInstance(contractName, identifier);
    this.contract = instance.proxyContract;
    this.wrapper = instance;
  };
}
