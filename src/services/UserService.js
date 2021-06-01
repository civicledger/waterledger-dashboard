import axios from "axios";
// import BaseService from "./BaseService";

axios.defaults.baseURL = process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL;

export default class UserService {
  entity = "users";
  logIn(email, password) {
    return axios.post("login", { email, password });
  }

  // saveUser({ user, token }) {
  //   localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("token", token);
  // }

  // logOut() {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  // }

  // static getLoggedInUser() {
  //   const userString = localStorage.getItem("user");
  //   const token = localStorage.getItem("token");
  //   if (!userString || userString === "undefined" || !token) {
  //     return { user: null, token: null, loggedIn: false };
  //   }
  //   const user = JSON.parse(userString);

  //   user.createdAt = new Date(user.createdAt);

  //   return { user, token, loggedIn: true };
  // }

  // static isLoggedIn() {
  //   return localStorage.getItem("token")?.length > 0;
  // }
}
