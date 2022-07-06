import { QueryClient } from "react-query";

import { orderService } from "../services/OrderService";
import { level1ResourceService } from "../services/Level1ResourceService";
import { liabilityService } from "../services/LiabilityService";
import { historyService } from "../services/HistoryService";
import { extractionRightService } from "../services/ExtractionRightService";
import { terminologyService } from "../services/TerminologyService";

export const queryClient = new QueryClient();

export const getOrders = async (type, extractionRightId = null) => {
  const { data } = await orderService.getAll({ type, extractionRightId });
  return data.orders;
};

export const getHistory = async (extractionRightId = null) => {
  const { data } = await historyService.getAll({ extractionRightId });
  return data.trades;
};

export const getLevel1Resource = async () => {
  const { data } = await level1ResourceService.getCurrentLevel1Resource();
  localStorage.setItem("level1ResourceId", data.level1Resource.id);
  return data.level1Resource;
};

export const getExtractionRight = async id => {
  const { data } = await extractionRightService.getOne(id);
  return data.extractionRight;
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
