import BaseService from "./BaseService";

export default class UsersService extends BaseService {
  async createUser(user) {
    return this.axios.post("signup", user);
  }
}
