import axios from "axios";
import { getInstanceIdentifier } from "../utils/ethUtils";
import { interceptResponse, interceptRequest } from "../utils/interceptors";

export const baseURL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(interceptRequest);
axios.interceptors.response.use(interceptResponse);

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

  async delete(id) {
    const headers = this.getHeaders();
    return await axios.delete(`${this.entity}/${id}`, { headers });
  }

  getHeaders() {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}`, "x-scheme": getInstanceIdentifier() };
  }
}
