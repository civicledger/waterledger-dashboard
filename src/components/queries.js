import { serviceLoader } from "../services/serviceLoader";
const orderbookService = serviceLoader("OrderBook");
const historyService = serviceLoader("OrderHistory");
const liabilityService = serviceLoader("Liability");

export const getOrders = async (key, type, licenceId = false) => {
  return await orderbookService.getOrders(type, licenceId);
};

export const getHistory = async (key, licenceId = false) => {
  return await historyService.getHistory(licenceId);
};

export const getScheme = async () => {
  return await orderbookService.getScheme();
};

export const getLiabilities = async () => {
  return await liabilityService.getLiabilities();
};
