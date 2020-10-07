import axios from "axios";
import { getInstanceIdentifier } from "../utils/ethUtils";

require("dotenv").config();

const deployedContractJsonUrl = process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL;

export default class AuthService {
  async authorise(email, password) {
    const { data } = await axios.post(`${deployedContractJsonUrl}admin/login`, { email, password });
    return data;
  }

  setToken(token) {
    localStorage.setItem("wl_jwt", token);
  }

  removeToken() {
    localStorage.removeItem("wl_jwt");
  }

  async apiGetLicences() {
    const params = { scheme: getInstanceIdentifier() };
    const { data } = await axios.get(`${deployedContractJsonUrl}admin/licences/`, { params });
    return data.licences;
  }
}
