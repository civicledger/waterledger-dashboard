import BaseService from "./BaseService";

export default class HistoryService extends BaseService {
  entity = "trades";
}

export const historyService = new HistoryService();
