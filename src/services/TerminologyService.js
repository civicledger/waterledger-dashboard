import axios from "axios";
import { defaultTerminologies } from "../utils/terminologies";
import BaseService from "./BaseService";
import { baseURL } from "./BaseService";
axios.defaults.baseURL = baseURL;

export default class TerminologyService extends BaseService {
  entity = "terminologies";

  static getSavedTerminologies() {
    const savedTerminologies = localStorage.getItem("terminologyObject");

    if (!savedTerminologies) return defaultTerminologies;

    return JSON.parse(localStorage.getItem("terminologyObject")).terminologies;
  }

  getCurrentTerminology() {
    const schemeId = localStorage.getItem("schemeId");
    return axios.get(`${this.entity}`, { params: { schemeId } });
  }
}

export const terminologyService = new TerminologyService();
