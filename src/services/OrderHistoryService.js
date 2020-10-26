import BaseService from "./BaseService";

export default class OrderHistoryService extends BaseService {
  contractName = "History";
  deploymentName = "history";

  async getHistory(licenceId = false) {
    const params = licenceId ? { licenceId } : {};

    const { data } = await this.axios.get("trades", { params });
    const { trades } = data;
    return trades;
  }
}
