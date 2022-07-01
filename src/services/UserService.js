import axios from "axios";
import BaseService from "./BaseService";
import SocketService from "./SocketService";
import { getInstanceIdentifier } from "../utils/ethUtils";
import { baseURL } from "./BaseService";

axios.defaults.baseURL = baseURL;

const socketService = SocketService.getInstance();

export default class UserService extends BaseService {
  entity = "users";
  login(email, password) {
    return axios.post("login", { email, password });
  }

  signup(user) {
    const headers = { "x-level1-resource": getInstanceIdentifier() };
    return axios.post("signup", user, { headers });
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

    socketService.emit("RegisterLicence", licenceId);
    socketService.emit("JoinLevel1Resource", getInstanceIdentifier());

    return { user, licenceId, token, activeWaterAccount, loggedIn: true };
  }

  static isLoggedIn() {
    return localStorage.getItem("token")?.length > 0;
  }
}

export const userService = new UserService();
