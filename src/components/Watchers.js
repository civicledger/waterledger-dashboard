import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import SocketService from "../services/SocketService";
import { addNotification } from "../redux/actions/actions";
import { queryClient } from "./queries";

const socketService = SocketService.getInstance();
const socket = socketService.getSocket();

const Watchers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("LicenceCompleted", () => {
      dispatch(addNotification({ text: `Your id has been approved and you can now trade` }));
    });
    socket.on("OrderAdded", async () => {
      await queryClient.invalidateQueries("buyOrders");
      await queryClient.invalidateQueries("sellOrders");
      dispatch(addNotification({ text: "Your order has been mined on the blockchain", type: "success" }));
    });

    // socket.on("OrdersModified", async () => {
    //   await queryClient.invalidateQueries("buyOrders");
    //   await queryClient.invalidateQueries("sellOrders");
    // });

    socket.on("TradeAdded", async () => {
      await queryClient.invalidateQueries("trades");
      await queryClient.invalidateQueries("getScheme");
      await queryClient.invalidateQueries("buyOrders");
      await queryClient.invalidateQueries("sellOrders");
      dispatch(addNotification({ text: "Refreshing trades list" }));
    });
    socket.on("BalanceUpdated", async () => {
      await queryClient.invalidateQueries("getLicence");
      console.log("Should update balance");
      dispatch(addNotification({ text: "Water Balance Updated" }));
    });
    socket.on("TradeCompleted", async () => {
      console.log("happend");
      await queryClient.invalidateQueries("trades");
      dispatch(addNotification({ text: "Your trade has been approved", type: "success" }));
      dispatch(addNotification({ text: "Refreshing trades list" }));
    });
    socket.on("BalancesUpdated", async () => {
      await queryClient.invalidateQueries("getLicence");
      dispatch(addNotification({ text: "Water Balance Updated" }));
    });
    socket.on("AcceptTransactionMined", async () => {
      dispatch(addNotification({ text: "Your trade transaction has been mined on the blockchain", type: "success" }));
    });
  }, [dispatch]);

  return <></>;
};

export default Watchers;
