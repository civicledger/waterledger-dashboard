import { QueryCache } from "react-query";

// import { orderService } from "../services/OrderService";
import { schemeService } from "../services/SchemeService";
import { liabilityService } from "../services/LiabilityService";
import { historyService } from "../services/HistoryService";
import { licenceService } from "../services/LicenceService";

export const queryCache = new QueryCache();

export const getOrders = async (key, type, licenceId = false) => {
  return [];
  // return await orderService.getOrders(type, licenceId);
};

export const getHistory = async (key, scheme, licenceId = false) => {
  const { data } = await historyService.getAll();
  return data.trades;
};

export const getScheme = async () => {
  const { data } = await schemeService.getCurrentScheme();
  return data.scheme;
};

export const getLicence = async id => {
  console.trace();
  const { data } = await licenceService.getOne(id);
  return data.licence;
};

export const getLiabilities = async () => {
  return await liabilityService.getLiabilities();
};
