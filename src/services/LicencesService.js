import BaseService from "./BaseService";

export default class LicencesService extends BaseService {
  contractName = "Licences";
  deploymentName = "licence";

  async apiGetLicenceByWaterAccount(waterAccount) {
    const params = { waterAccount };

    try {
      const { data } = await this.axios.get("onboarding/licences/", { params });
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async apiGetLicence(id) {
    const { data } = await this.axios.get(`licences/${id}`);
    return data;
  }

  async apiActivateLicence(id, code, ethAddress) {
    const { data } = await this.axios.patch(`onboarding/${id}`, { code, ethAddress });
    localStorage.setItem("jwToken", data.token);
    this.axios.defaults.headers.common.Authorization = `bearer ${data.token}`;
  }

  async getWaterAccounts() {
    const waterAccount = localStorage.getItem("wlWaterAccount");

    if (!waterAccount) return [];

    await this.loadContract("Licences");

    const licenceIndex = await this.contract.getLicenceIndexForWaterAccountId(waterAccount);
    const waterAccounts = await this.contract.getWaterAccountsForLicence(licenceIndex);

    return waterAccounts.sort((a, b) => Math.sign(a.zoneIndex - b.zoneIndex));
  }
}
