import { getInstanceIdentifier } from "../utils/ethUtils";
import { loadInstance } from "../utils/ContractInstanceLoader";

export default class OrderBookService {
  contractName = "OrderBook";

  async getScheme() {
    await this.loadContract(this.contractName);
    return await this.contract.getScheme();
  }

  async getAddress() {
    await this.loadContract(this.contractName);
    return this.contract.address;
  }

  async getSellOrders(number = 10) {
    await this.loadContract(this.contractName);
    return await this.contract.getOrderBookSells(number);
  }

  async getLicenceSellOrders(licenceAddress, number = 10) {
    await this.loadContract(this.contractName);
    return await this.contract.getLicenceOrderBookSells(licenceAddress, number);
  }

  async getBuyOrders(number = 10) {
    await this.loadContract(this.contractName);
    const orders = await this.contract.getOrderBookBuys(number);
    return orders;
  }

  async getLicenceBuyOrders(licenceAddress, number = 10) {
    await this.loadContract(this.contractName);
    return await this.contract.getLicenceOrderBookBuys(licenceAddress, number);
  }

  async addBuyOrder(price, amount, zone) {
    await this.loadContract(this.contractName);
    return await this.contract.addBuyLimitOrder(price, amount, zone);
  }

  async addSellOrder(price, amount, zone) {
    await this.loadContract(this.contractName);
    return await this.contract.addSellLimitOrder(price, amount, zone);
  }

  async deleteBuyOrder(orderIndex) {
    await this.loadContract(this.contractName);
    return await this.contract.deleteBuyOrder(orderIndex);
  }

  async deleteSellOrder(orderIndex) {
    await this.loadContract(this.contractName);
    return await this.contract.deleteSellOrder(orderIndex);
  }

  async awaitConfirmationForHash(hash) {
    await this.loadContract(this.contractName);
    return await this.wrapper.getTransactionSuccess(hash);
  }

  async getLastTradePrice() {
    await this.loadContract(this.contractName);
    return await this.contract.getLastTradedPrice();
  }

  async getEvents(startBlock) {
    await this.loadContract(this.contractName);
    return this.wrapper.events.Matched({ fromBlock: startBlock });
  }

  async getAllEvents() {
    await this.loadContract(this.contractName);
    return this.wrapper.events;
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
