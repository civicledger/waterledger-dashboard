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
