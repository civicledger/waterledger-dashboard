import BaseService from "./BaseService";

export default class UsersService extends BaseService {
  async login(email, password) {
    return this.axios.post("login", { email, password });
  }
}
