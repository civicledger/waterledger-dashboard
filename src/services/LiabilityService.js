import BaseService from "./BaseService";

export default class LiabilityService extends BaseService {
  entity = "liabilities";
}

export const liabilityService = new LiabilityService();
