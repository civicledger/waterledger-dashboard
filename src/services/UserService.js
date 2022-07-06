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

  saveLocalUser({ user, token, extractionRightId, activeWaterAccount }) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("extractionRightId", extractionRightId);
    localStorage.setItem("token", token);
    localStorage.setItem("activeWaterAccount", activeWaterAccount);
  }

  static logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("extractionRightId");
    localStorage.removeItem("token");
    localStorage.removeItem("activeWaterAccount");
  }

  static getLoggedInUser() {
    const userString = localStorage.getItem("user");
    const extractionRightId = localStorage.getItem("extractionRightId");
    const token = localStorage.getItem("token");
    const activeWaterAccount = localStorage.getItem("activeWaterAccount");

    if (!userString || userString === "undefined" || !token) {
      return { user: null, token: null, extractionRightId: null, activeWaterAccount: null, loggedIn: false };
    }
    const user = JSON.parse(userString);

    user.createdAt = new Date(user.createdAt);

    socketService.emit("RegisterExtractionRight", extractionRightId);
    socketService.emit("JoinLevel1Resource", getInstanceIdentifier());

    return { user, extractionRightId, token, activeWaterAccount, loggedIn: true };
  }

  static isLoggedIn() {
    return localStorage.getItem("token")?.length > 0;
  }
}

export const userService = new UserService();
