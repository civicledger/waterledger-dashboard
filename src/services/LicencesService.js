import axios from "axios";

import BaseService from "./BaseService";

import { getInstanceIdentifier } from "../utils/ethUtils";

require("dotenv").config();

const deployedContractJsonUrl = process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL;

export default class LicencesService extends BaseService {
  contractName = "Licences";
  deploymentName = "licence";

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
}
