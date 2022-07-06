import BaseService from "./BaseService";

export default class ExtractionRightService extends BaseService {
  entity = "extractionRights";
}

export const extractionRightService = new ExtractionRightService();
