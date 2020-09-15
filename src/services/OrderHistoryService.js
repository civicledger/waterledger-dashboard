import BaseService from "./BaseService";

export default class OrderHistoryService extends BaseService {
  contractName = "History";

  async getHistory(number = 10) {
    await this.loadContract(this.contractName);
    const history = await this.contract.getHistory(number);
    return history;
  }

  async getLicenceHistory(licenceAddress) {
    await this.loadContract(this.contractName);
    return await this.contract.getLicenceHistory(licenceAddress);
  }
}
