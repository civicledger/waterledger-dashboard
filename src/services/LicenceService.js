import BaseService from "./BaseService";

export default class LicenceService extends BaseService {
  entity = "licences";
}

export const licenceService = new LicenceService();
