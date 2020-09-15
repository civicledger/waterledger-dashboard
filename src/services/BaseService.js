import { getInstanceIdentifier } from "../utils/ethUtils";
import { loadInstance } from "../utils/ContractInstanceLoader";

export default class BaseService {
  async getAllEvents() {
    await this.loadContract(this.contractName);
    return this.wrapper.events;
  }

  async getPastEvents() {
    await this.loadContract(this.contractName);
    const rawEvents = await this.wrapper.web3Contract.getPastEvents("allEvents", { fromBlock: 0 });

    return Promise.all(
      rawEvents.map(async raw => {
        let { address, transactionHash, returnValues, event, blockNumber } = raw;

        returnValues = Object.entries(returnValues)
          .filter(([key]) => isNaN(key))
          .map(([key, value]) => ({ key, value }));

        const { timestamp } = await this.wrapper.web3.eth.getBlock(blockNumber);
        return { event, address, transactionHash, returnValues, contract: this.contractName, time: new Date(timestamp * 1000) };
      })
    );
  }

  loadContract = async (contractName, identifier = false) => {
    if (this.contract) return;

    if (!identifier) {
      identifier = getInstanceIdentifier();
    }
    const instance = await loadInstance(contractName, identifier);
    this.contract = instance.proxyContract;
    this.wrapper = instance;
  };
}
