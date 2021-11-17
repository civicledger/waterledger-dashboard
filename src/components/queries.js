import { QueryClient } from "react-query";

import { orderService } from "../services/OrderService";
import { schemeService } from "../services/SchemeService";
import { liabilityService } from "../services/LiabilityService";
import { historyService } from "../services/HistoryService";
import { licenceService } from "../services/LicenceService";
import { terminologyService } from "../services/TerminologyService";
import { defaultTerminologies } from "../utils/terminologies";

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

export const getTerminologies = async () => {
  const {
    data: { terminologies },
  } = await terminologyService.getCurrentTerminology();

  const applicableTerminologies = Object.fromEntries(terminologies.map(term => [term.term, term.termValue]));

  const returnData = { terminologies: { ...defaultTerminologies, ...applicableTerminologies } };

  localStorage.setItem("terminologyObject", JSON.stringify(returnData));

  return returnData;
};
