import axios from "axios";
import { getInstanceIdentifier } from "../utils/ethUtils";
import BaseService, { baseURL } from "./BaseService";
axios.defaults.baseURL = baseURL;

export default class TerminologyService extends BaseService {
  entity = "terminologies";

  getCurrentTerminology() {
    return axios.get(`${this.entity}`, { params: { schemeIdentifier: getInstanceIdentifier() } });
  }

  getDefaultTerminologies() {
    return axios.get(`${this.entity}`, { params: { schemeIdentifier: "default" } });
  }
}

export const terminologyService = new TerminologyService();
