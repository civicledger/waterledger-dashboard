import BaseService from "./BaseService";
import { getInstanceIdentifier } from "../utils/ethUtils";

export default class OrderBookService extends BaseService {
  contractName = "OrderBook";
  deploymentName = "orderbook";

  sortCallbacks = {
    sell: (a, b) => Math.sign(b.price - a.price),
    buy: (a, b) => Math.sign(a.price - b.price),
  };

  async getScheme() {
    const { data } = await this.axios.get(`schemes/${getInstanceIdentifier()}`);
    return data.scheme;
  }

  async getAddress() {
    await this.loadContract(this.contractName);
    return this.contract.address;
  }

  async getOrders(type, ownerAddress = null) {
    const params = { type, ownerAddress };
    const { data } = await this.axios.get("orders", { params });
    const { orders } = data;
    orders.sort(this.sortCallbacks[type]);
    return orders;
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
