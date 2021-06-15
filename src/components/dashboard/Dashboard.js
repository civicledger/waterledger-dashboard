import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";

import { getOrders, getHistory, getLicence } from "../queries";
import TradesList from "../history/TradesList";
import OrderList from "../orders/OrderList";
import AccountBanner from "./AccountBanner";
import Scheme from "./Scheme";

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

  return (
    <div className="grid grid-cols-12 py-5 px-5 lg:px-10 pb-5">
      <div className="col-span-12">
        <AccountBanner />
      </div>
      <div className="lg:flex col-span-12 lg:col-span-4 xl:col-span-3">
        <Scheme />
      </div>
      <div className="col-span-12 lg:col-span-8 xl:col-span-9">
        <Graph />
        <div className="col-span-12 lg:col-span-9 lg:col-start-4">
          <h2 className="lg:ml-2 pb-3 lg:pb-6 text-2xl">Order Book</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 lg:col-span-1 p-0 pt-3 lg:p-5 rounded bg-steel-800">
              <h2 className="text-xl mb-3 ml-5 lg:ml-0 font-semibold">Bids</h2>

              <OrderList orders={buyOrders} type="buy" deleteOrder={deleteOrder} isLoading={buysLoading} waterAccounts={waterAccounts} />
              {loggedIn && <OrderButton type="buy" openOrderForm={() => dispatch(openOrderForm({ type: "buy", price: "", quantity: "" }))} />}
            </div>

            <div className="col-span-2 lg:col-span-1 p-0 pt-3 lg:p-5 rounded bg-steel-800">
              <h2 className="text-xl mb-3 ml-5 lg:ml-0 font-semibold">Offers</h2>

              <OrderList orders={sellOrders} type="sell" deleteOrder={deleteOrder} isLoading={sellsLoading} waterAccounts={waterAccounts} />
              {loggedIn && <OrderButton type="sell" openOrderForm={() => dispatch(openOrderForm({ type: "sell", price: "", quantity: "" }))} />}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 ">
        <TradesList className="col-span-12" trades={trades} isLoading={tradesLoading} limit="10" />
      </div>
    </div>
  );
};
