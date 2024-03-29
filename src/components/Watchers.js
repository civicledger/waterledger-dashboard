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
    socket.on("ExtractionRightCompleted", () => {
      dispatch(addNotification({ text: `Your id has been approved and you can now trade` }));
    });
    socket.off("OrderAdded").on("OrderAdded", async () => {
      await queryClient.invalidateQueries("buyOrders");
      await queryClient.invalidateQueries("sellOrders");
      dispatch(addNotification({ text: "Your order has been mined on the blockchain", type: "success" }));
    });

    socket.off("OrdersModified").on("OrdersModified", async () => {
      await queryClient.invalidateQueries("buyOrders");
      await queryClient.invalidateQueries("sellOrders");
      dispatch(addNotification({ text: "Refreshing order list" }));
    });

    socket.off("TradeAdded").on("TradeAdded", async () => {
      await queryClient.invalidateQueries("trades");
      await queryClient.invalidateQueries("getLevel1Resource");
      await queryClient.invalidateQueries("buyOrders");
      await queryClient.invalidateQueries("sellOrders");
      dispatch(addNotification({ text: "Refreshing trades list" }));
    });
    socket.off("BalanceUpdated").on("BalanceUpdated", async () => {
      await queryClient.invalidateQueries("getExtractionRight");
      dispatch(addNotification({ text: "Water Balance Updated" }));
    });
    socket.off("TradeCompleted").on("TradeCompleted", async () => {
      await queryClient.invalidateQueries("trades");
      dispatch(addNotification({ text: "Your trade has been approved", type: "success" }));
      dispatch(addNotification({ text: "Refreshing trades list" }));
    });
    socket.off("BalancesUpdated").on("BalancesUpdated", async () => {
      await queryClient.invalidateQueries("getExtractionRight");
      dispatch(addNotification({ text: "Water Balance Updated" }));
    });
    socket.off("AcceptTransactionMined").on("AcceptTransactionMined", async () => {
      dispatch(addNotification({ text: "Your trade transaction has been mined on the blockchain", type: "success" }));
    });
  }, [dispatch]);

  return <></>;
};

export default Watchers;
