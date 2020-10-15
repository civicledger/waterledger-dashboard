export default class ZonesService {
  contract = "Zones";
  deploymentName = "zones";

  async getBalances(address) {
    await this.loadContract(this.contractName);
    return await this.contract.getBalances(address);
  }


}
