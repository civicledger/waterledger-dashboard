import axios from "axios";
import { getInstanceIdentifier } from "../utils/ethUtils";

axios.defaults.baseURL = process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL;

export default class BaseService {
  create(data) {
    const headers = this.getHeaders();
    return axios.post(this.entity, data, { headers });
  }

  async getAll(params = {}) {
    const headers = this.getHeaders();
    return await axios.get(this.entity, { headers, params });
  }

  async getOne(id) {
    const headers = this.getHeaders();
    return await axios.get(`${this.entity}/${id}`, { headers });
  }

  getHeaders() {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}`, "x-scheme": getInstanceIdentifier() };
  }
}
