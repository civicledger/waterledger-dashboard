import BaseService from "./BaseService";

export default class AcceptanceService extends BaseService {
  entity = "acceptances";
}

export const acceptanceService = new AcceptanceService();
