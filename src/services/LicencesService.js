import axios from "axios";

import BaseService from "./BaseService";

import { getInstanceIdentifier } from "../utils/ethUtils";

require("dotenv").config();

export default class LicencesService extends BaseService {
  contractName = "Licences";
  deploymentName = "licence";

  async apiGetLicenceByWaterAccount(waterAccount) {
    const params = {waterAccount};

    try{
      const { data } = await axios.get('onboarding/licences/', {params});
      console.log(data.licence.accounts);
      return data;
      return false;
    }catch(error) {
      console.log(error);
      return false;
    }
  }

  async apiGetLicence(id) {
    const { data } = await axios.get(`api/licences/${id}`);
    console.log(data);
    return data;
  }

  async apiActivateLicence(id, code) {
    await axios.post('onboarding/accept', {id, code});
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
