import Web3 from "web3";
const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.REACT_APP_PROVIDER_URL));

export default class AuditService {
  orderbookInstance = null;

  constructor(level1Resource) {
    const { deployments } = level1Resource;
    const orderbook = deployments.find(({ contractName }) => contractName === "OrderBook");
    this.orderbookInstance = this.createInstance(orderbook.details);
  }

  async getOrderbookPastEvents() {
    const rawEvents = await this.orderbookInstance.getPastEvents("allEvents", { fromBlock: 0 });
    return this.cleanEventData(rawEvents, "OrderBook");
  }

  createInstance({ abi, address }) {
    return new web3.eth.Contract(JSON.parse(abi), address);
  }

  async cleanEventData(rawEvents, contract) {
    return Promise.all(
      rawEvents.map(async raw => {
        let { address, transactionHash, returnValues, event, blockNumber } = raw;

        returnValues = Object.entries(returnValues)
          .filter(([key]) => isNaN(key))
          .map(([key, value]) => ({ key, value }));

        const { timestamp } = await web3.eth.getBlock(blockNumber);
        return { event, address, transactionHash, returnValues, contract, time: new Date(timestamp * 1000) };
      })
    );
  }
}
