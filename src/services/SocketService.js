import { io } from "socket.io-client";

export default class SocketService {
  static instance = null;

  #socket = io(process.env.REACT_APP_WL_CONTRACT_DEPLOYMENT_URL);

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
    console.log("emitting");
    console.log(...args);
    this.#socket.emit(...args);
  }
}
