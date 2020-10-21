import BaseService from "./BaseService";

export default class ZonesService extends BaseService {
  contractName = "Zones";
  deploymentName = "zones";

  async getBalances(address) {
    await this.loadContract(this.contractName);
    return await this.contract.getBalances(address);
  }
}
