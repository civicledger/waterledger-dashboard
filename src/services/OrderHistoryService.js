import BaseService from "./BaseService";
// import { getCurrentNetwork } from "../utils/ethUtils";

export default class OrderHistoryService extends BaseService {
  contractName = "History";

  async getHistory(number = 10) {
    // console.log(`trades/${getCurrentNetwork()}`);
    const { data } = await this.axios.get("/trades");
    console.log(data.trades);
    return data.trades;
  }

  async getLicenceHistory(licenceAddress) {
    await this.loadContract(this.contractName);
    return await this.contract.getLicenceHistory(licenceAddress);
  }
}
