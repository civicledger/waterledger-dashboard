import { serviceLoader } from "../services/serviceLoader";
const orderbookService = serviceLoader("OrderBook");
const historyService = serviceLoader("OrderHistory");
const liabilityService = serviceLoader("Liability");

export const getOrders = async (key, type, ownerAddress = false) => {
  return await orderbookService.getOrders(type, ownerAddress);
};

export const getHistory = async (key, ownerAddress = false) => {
  return await historyService.getHistory(ownerAddress);
};

export const getScheme = async () => {
  return await orderbookService.getScheme();
};

export const getLiabilities = async () => {
  return await liabilityService.getLiabilities();
};
