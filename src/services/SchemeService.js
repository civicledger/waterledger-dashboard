import axios from "axios";
import BaseService from "./BaseService";
import { getInstanceIdentifier } from "../utils/ethUtils";

axios.defaults.baseURL = process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL;
// console.log(process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL);
export default class SchemeService extends BaseService {
  entity = "schemes";

  getCurrentScheme() {
    return axios.get(`${this.entity}/${getInstanceIdentifier()}`);
  }
}

export const schemeService = new SchemeService();
