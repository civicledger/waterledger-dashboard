import axios from "axios";
import BaseService from "./BaseService";
import { getInstanceIdentifier } from "../utils/ethUtils";
import { baseURL } from "./BaseService";
axios.defaults.baseURL = baseURL;

export default class Level1ResourceService extends BaseService {
  entity = "level1Resources";

  getCurrentLevel1Resource() {
    return axios.get(`${this.entity}/${getInstanceIdentifier()}`);
  }
}

export const level1ResourceService = new Level1ResourceService();
