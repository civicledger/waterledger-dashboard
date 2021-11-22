import axios from "axios";
import { getInstanceIdentifier } from "../utils/ethUtils";
import { defaultTerminologies } from "../utils/terminologies";
import BaseService, { baseURL } from "./BaseService";
axios.defaults.baseURL = baseURL;

export default class TerminologyService extends BaseService {
  entity = "terminologies";

  static getSavedTerminologies() {
    const savedTerminologies = localStorage.getItem("terminologyObject");

    if (!savedTerminologies) return defaultTerminologies;

    return JSON.parse(localStorage.getItem("terminologyObject")).terminologies;
  }

  getCurrentTerminology() {
    return axios.get(`${this.entity}`, { params: { schemeIdentifier: getInstanceIdentifier() } });
  }
}

export const terminologyService = new TerminologyService();
