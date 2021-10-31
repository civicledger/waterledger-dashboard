import { io } from "socket.io-client";

import { baseURL } from "./BaseService";

export default class SocketService {
  static instance = null;

  #socket = io(baseURL);

  static getInstance() {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }

    return SocketService.instance;
  }

  getSocket() {
    return this.#socket;
  }

  emit(...args) {
    this.#socket.emit(...args);
  }
}
