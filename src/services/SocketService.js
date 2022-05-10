import { io } from "socket.io-client";

export default class SocketService {
  static instance = null;

  #socket = io("wss://localhost:3002");

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
