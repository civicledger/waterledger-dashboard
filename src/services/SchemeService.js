import axios from "axios";
import BaseService from "./BaseService";
import { getInstanceIdentifier } from "../utils/ethUtils";
import { baseURL } from "./BaseService";
axios.defaults.baseURL = baseURL;

export default class SchemeService extends BaseService {
  entity = "schemes";

  getCurrentScheme() {
    return axios.get(`${this.entity}/${getInstanceIdentifier()}`);
  }
}

export const schemeService = new SchemeService();
