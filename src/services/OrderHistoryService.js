import BaseService from "./BaseService";

export default class OrderHistoryService extends BaseService {
  contractName = "History";
  deploymentName = "history";

  async getHistory(address = false) {
    const params = address ? {address} : {};

    const { data } = await this.axios.get("trades", { params });
    const { trades } = data;
    return trades;
  }
}
