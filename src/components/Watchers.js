import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SocketService from "../services/SocketService";
import { addNotification } from "../redux/actions/actions";

const socketService = SocketService.getInstance();
const socket = socketService.getSocket();

const Watchers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("LicenceCompleted", () => {
      dispatch(addNotification({ text: "Your licence has been approved and you can now trade" }));
    });
  }, [socket, dispatch]);

  return "";
};

export default Watchers;
