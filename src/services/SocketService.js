import { io } from "socket.io-client";

export default class SocketService {
  static instance = null;

  #socket = io(process.env.REACT_APP_WEBSOCKET);

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
