import { useDispatch } from "react-redux";
import SocketService from "../services/SocketService";
import { addNotification } from "../redux/actions/actions";

const socketService = SocketService.getInstance();
const socket = socketService.getSocket();

const Watchers = () => {
  const dispatch = useDispatch();

  socket.on("LicenceCompleted", () => {
    console.log("licence complete event received");
    dispatch(addNotification({ text: "Your licence has been approved and you can now trade" }));
  });
  return "";
};

export default Watchers;
