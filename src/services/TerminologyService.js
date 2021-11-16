import axios from "axios";
import BaseService from "./BaseService";
import { baseURL } from "./BaseService";
axios.defaults.baseURL = baseURL;

export default class TerminologyService extends BaseService {
  entity = "terminologies";

  /// wip
  getCurrentTerminology() {
    const schemeId = localStorage.getItem("schemeId");
    const defaultTerminologies = {
      scheme: "scheme",
      account: "account",
      ML: "ML",
    };
    console.log(schemeId, defaultTerminologies);

    return axios.get(`${this.entity}`, { params: { schemeId } });
  }
}

export const terminologyService = new TerminologyService();
