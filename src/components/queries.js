import { QueryClient } from "react-query";

import { orderService } from "../services/OrderService";
import { schemeService } from "../services/SchemeService";
import { liabilityService } from "../services/LiabilityService";
import { historyService } from "../services/HistoryService";
import { licenceService } from "../services/LicenceService";
import { terminologyService } from "../services/TerminologyService";

export const queryClient = new QueryClient();

export const getOrders = async (type, licenceId = null) => {
  const { data } = await orderService.getAll({ type, licenceId });
  return data.orders;
};

export const getHistory = async (licenceId = null) => {
  const { data } = await historyService.getAll({ licenceId });
  return data.trades;
};

export const getScheme = async () => {
  const { data } = await schemeService.getCurrentScheme();
  localStorage.setItem("schemeId", data.scheme.id);
  return data.scheme;
};

export const getLicence = async id => {
  const { data } = await licenceService.getOne(id);
  return data.licence;
};

export const getLiabilities = async () => {
  const { data } = await liabilityService.getAll();
  return data.liabilities;
};

export const getSavedTerminologies = () => {
  return queryClient.getQueryData("getTerminologies");
};

export const getTerminologies = async () => {
  const { data } = await terminologyService.getCurrentTerminology();

  return data.terminologies.reduce((terms, { term, termValue }) => {
    terms[term] = termValue;
    return terms;
  }, {});
};
