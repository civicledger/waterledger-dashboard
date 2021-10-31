import Web3 from "web3";
const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.REACT_APP_PROVIDER_URL));

export default class AuditService {
  orderbookInstance = null;
  zonesInstance = null;
  licenceInstance = null;
  historyInstance = null;

  constructor(scheme) {
    const { orderbookDeployment, zonesDeployment, licenceDeployment, historyDeployment } = scheme;
    this.orderbookInstance = this.createInstance(orderbookDeployment);
    this.zonesInstance = this.createInstance(zonesDeployment);
    this.licenceInstance = this.createInstance(licenceDeployment);
    this.historyInstance = this.createInstance(historyDeployment);
  }

  async getOrderbookPastEvents() {
    const rawEvents = await this.orderbookInstance.getPastEvents("allEvents", { fromBlock: 0 });
    return this.cleanEventData(rawEvents, "OrderBook");
  }

  async getZonesPastEvents() {
    const rawEvents = await this.zonesInstance.getPastEvents("allEvents", { fromBlock: 0 });
    return this.cleanEventData(rawEvents, "Zones");
  }

  async getHistoryPastEvents() {
    const rawEvents = await this.historyInstance.getPastEvents("allEvents", { fromBlock: 0 });
    return this.cleanEventData(rawEvents, "History");
  }

  async getLicencePastEvents() {
    const rawEvents = await this.licenceInstance.getPastEvents("allEvents", { fromBlock: 0 });
    return this.cleanEventData(rawEvents, "Licence");
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
