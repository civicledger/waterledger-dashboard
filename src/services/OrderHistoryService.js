import { getInstanceIdentifier } from '../utils/ethUtils';
import { loadInstance } from '../utils/ContractInstanceLoader';

export default class OrderHistoryService {

  contractName = 'History';

  // @defaultContract
  async getHistory(number = 10) {
    await this.loadContract(this.contractName);
    return await this.contract.getHistory(number);
  }

  loadContract = async (contractName, identifier = false) => {
    if(this.contract) return;

    if(!identifier){
      identifier = getInstanceIdentifier();
    }
    const instance = await loadInstance(contractName, identifier);
    this.contract = instance.proxyContract;
  }

}