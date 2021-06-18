import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";

import { getOrders, getHistory, getLicence } from "../queries";
import TradesList from "../history/TradesList";
import OrderList from "../orders/OrderList";
import AccountBanner from "./AccountBanner";
import Scheme from "./Scheme";
import WaterAccountsList from "./WaterAccountsList";

import Graph from "./Graph";

import OrderButton from "./OrderButton";

import { openOrderForm, deleteOrder } from "../../redux/actions/orders";
import { UserContext } from "../contexts";

export default props => {
  const dispatch = useDispatch();
  const {
    login: { loggedIn, licenceId },
  } = useContext(UserContext);

  const { data: buyOrders, isLoading: buysLoading } = useQuery(["getOrders", "buy"], () => getOrders("buy", null), { keepPreviousData: true });
  const { data: sellOrders, isLoading: sellsLoading } = useQuery(["getOrders", "sell"], () => getOrders("sell", null), { keepPreviousData: true });
  const { data: trades, isLoading: tradesLoading } = useQuery(["getTrades"], () => getHistory(null), { keepPreviousData: true });
  const { data: licence } = useQuery(["getLicence", licenceId], () => getLicence(licenceId), { keepPreviousData: true });

  const waterAccounts = licence ? licence.accounts : [];
  const isPending = licence?.status === 1;

  return (
    <div className="grid gap-4 grid-cols-8 lg:p-5">
      <AccountBanner />
      <Scheme />
      <div className="col-span-8 lg:col-span-6">
        <Graph />
      </div>
      <div className="col-span-8 lg:col-span-6">
        <h2 className="px-5 text-2xl">Order Book</h2>
      </div>
      <div className="col-span-8 lg:col-span-3 p-5 rounded bg-steel-800">
        <h2 className="text-xl mb-3 font-semibold">Bids</h2>

        <OrderList orders={buyOrders} type="buy" deleteOrder={deleteOrder} isLoading={buysLoading} waterAccounts={waterAccounts} />
        {loggedIn && (
          <OrderButton type="buy" isPending={isPending} openOrderForm={() => dispatch(openOrderForm({ type: "buy", price: "", quantity: "" }))} />
        )}
      </div>

      <div className="col-span-8 lg:col-span-3 p-5 rounded bg-steel-800">
        <h2 className="text-xl mb-3 font-semibold">Offers</h2>

        <OrderList orders={sellOrders} type="sell" deleteOrder={deleteOrder} isLoading={sellsLoading} waterAccounts={waterAccounts} />
        {loggedIn && (
          <OrderButton type="sell" isPending={isPending} openOrderForm={() => dispatch(openOrderForm({ type: "sell", price: "", quantity: "" }))} />
        )}
      </div>
      <div className="col-span-8">
        <TradesList trades={trades} isLoading={tradesLoading} limit="10" />
      </div>
    </div>
  );
};
