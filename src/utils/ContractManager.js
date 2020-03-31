import { loadInstance } from './ContractInstanceLoader';
import { getInstanceIdentifier } from './ethUtils';

class ContractManager {

  static #contractWrappers = {};

  async getContractWrapper(contractName) {
    if(!ContractManager.#contractWrappers[contractName]) {
      if(!ContractManager.#contractWrappers[contractName]) {
        ContractManager.#contractWrappers[contractName] = await loadInstance(contractName, getInstanceIdentifier());
      }
    }
    return ContractManager.#contractWrappers[contractName];
  };

}

export default ContractManager;