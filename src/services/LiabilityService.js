import BaseService from "./BaseService";

export default class LiabilityService extends BaseService {
  async getLiabilities() {
    const { data } = await this.axios.get("liabilities");
    return data.liabilities;
  }
}
