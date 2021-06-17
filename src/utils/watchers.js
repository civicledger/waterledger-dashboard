import SocketService from "../services/SocketService";
import queryCache from "../components/queries";

const socketService = SocketService.getInstance();
const socket = socketService.getSocket();

export const watchForLicenceCompleted = () => {
  socket.on("LicenceCompleted", () => {
    console.log("licence complete event received");
  });
};
