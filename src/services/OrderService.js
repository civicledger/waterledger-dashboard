import BaseService from "./BaseService";
import {} from "../utils/ethUtils";

export default class OrderService extends BaseService {
  entity = "orders";
}

export const orderService = new OrderService();
