import BaseService from "./BaseService";

export default class OrderBookService extends BaseService {
  contractName = "OrderBook";

  async getScheme() {
    await this.loadContract(this.contractName);
    return await this.contract.getScheme();
  }

  async getAddress() {
    await this.loadContract(this.contractName);
    return this.contract.address;
  }

  async getSellOrders() {
    await this.loadContract(this.contractName);
    const orders = await this.contract.getOrderBookSells();
    orders.sort((a, b) => Math.sign(a.price - b.price));
    return orders;
  }

  async getLicenceSellOrders(licenceAddress) {
    await this.loadContract(this.contractName);
    const orders = await this.contract.getLicenceOrderBookSells(licenceAddress);
    orders.sort((a, b) => Math.sign(b.price - a.price));
    return orders;
  }

  async getBuyOrders() {
    await this.loadContract(this.contractName);
    const orders = await this.contract.getOrderBookBuys();
    orders.sort((a, b) => Math.sign(b.price - a.price));
    return orders;
  }

  async getLicenceBuyOrders(licenceAddress) {
    await this.loadContract(this.contractName);
    return await this.contract.getLicenceOrderBookBuys(licenceAddress);
  }

  async addBuyOrder(price, amount, zone) {
    await this.loadContract(this.contractName);
    return await this.contract.addBuyLimitOrder(price, amount * 1000, zone);
  }

  async addSellOrder(price, amount, zone) {
    await this.loadContract(this.contractName);
    return await this.contract.addSellLimitOrder(price, amount * 1000, zone);
  }

  async acceptOrder(id, zone) {
    await this.loadContract(this.contractName);
    return await this.contract.acceptOrder(id, zone);
  }

  async deleteOrder(id) {
    await this.loadContract(this.contractName);
    return await this.contract.deleteOrder(id);
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
}
