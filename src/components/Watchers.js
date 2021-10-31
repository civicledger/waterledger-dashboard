import { useEffect } from "react";

import { useDispatch } from "react-redux";

// import SocketService from "../services/SocketService";
// import { addNotification } from "../redux/actions/actions";
// import { queryClient } from "./queries";

// const socketService = SocketService.getInstance();
// const socket = socketService.getSocket();

const Watchers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // socket.on("LicenceCompleted", () => {
    //   dispatch(addNotification({ text: "Your licence has been approved and you can now trade" }));
    // });
    // socket.on("OrderAdded", async () => {
    //   await queryClient.invalidateQueries("buyOrders");
    //   await queryClient.invalidateQueries("sellOrders");
    //   dispatch(addNotification({ text: "Refreshing order lists" }));
    // });
    // socket.on("TradeAdded", async () => {
    //   await queryClient.invalidateQueries("trades");
    //   dispatch(addNotification({ text: "Refreshing trades list" }));
    // });
    // socket.on("BalanceUpdated", async () => {
    //   await queryClient.invalidateQueries("getLicence");
    //   console.log("Should update balance");
    //   dispatch(addNotification({ text: "Water Balance Updated" }));
    // });
    // socket.on("OrderTransactionMined", async () => {
    //   dispatch(addNotification({ text: "Your order has been mined on the blockchain", type: "success" }));
    // });
    // socket.on("AcceptTransactionMined", async () => {
    //   dispatch(addNotification({ text: "Your trade transaction has been mined on the blockchain", type: "success" }));
    // });
  }, [dispatch]);

  return "";
};

export default Watchers;
