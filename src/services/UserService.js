import axios from "axios";
import BaseService from "./BaseService";

axios.defaults.baseURL = process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL;

export default class UserService extends BaseService {
  entity = "users";
  login(email, password) {
    return axios.post("login", { email, password });
  }

  signup(user) {
    return axios.post("signup", user);
  }

  saveLocalUser({ user, token, licenceId, activeWaterAccount }) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("licenceId", licenceId);
    localStorage.setItem("token", token);
    localStorage.setItem("activeWaterAccount", activeWaterAccount);
  }

  static logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("licenceId");
    localStorage.removeItem("token");
    localStorage.removeItem("activeWaterAccount");
  }

  static getLoggedInUser() {
    const userString = localStorage.getItem("user");
    const licenceId = localStorage.getItem("licenceId");
    const token = localStorage.getItem("token");
    const activeWaterAccount = localStorage.getItem("activeWaterAccount");
    if (!userString || userString === "undefined" || !token) {
      return { user: null, token: null, licenceId: null, activeWaterAccount: null, loggedIn: false };
    }
    const user = JSON.parse(userString);

    user.createdAt = new Date(user.createdAt);

    return { user, licenceId, token, activeWaterAccount, loggedIn: true };
  }

  static isLoggedIn() {
    return localStorage.getItem("token")?.length > 0;
  }
}

export const userService = new UserService();
