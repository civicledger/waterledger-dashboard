import React, { useContext } from "react";
import { useQuery } from "react-query";

import { getHistory, getLicence } from "../queries";
import TradesList from "../history/TradesList";
import OrderList from "../orders/OrderList";
import AccountBanner from "./AccountBanner";
import Scheme from "./Scheme";

import Graph from "./Graph";

import { UserContext } from "../contexts";

export default () => {
  const {
    login: { loggedIn, licenceId },
  } = useContext(UserContext);

  const { data: trades, isLoading: tradesLoading } = useQuery(["getTrades"], () => getHistory(null), { keepPreviousData: true });
  const { data: licence } = useQuery(["getLicence", licenceId], () => getLicence(licenceId), { keepPreviousData: true });

  const waterAccounts = licence ? licence.accounts : [];
  const isPending = licence?.status === 1;

  return (
    <div className="grid gap-4 grid-cols-8 lg:p-5">
      <AccountBanner pending={isPending} loggedIn={loggedIn} />
      <Scheme />
      <div className="col-span-8 lg:col-span-6">
        <Graph />
      </div>
      <div className="col-span-8 lg:col-span-6">
        <h2 className="px-5 text-2xl">Order Book</h2>
      </div>
      <div className="col-span-8 lg:col-span-3 p-5 rounded bg-steel-800">
        <h2 className="text-xl mb-3 font-semibold">Bids</h2>

        <OrderList type="buy" isPending={isPending} loggedIn={loggedIn} waterAccounts={waterAccounts} />
      </div>

      <div className="col-span-8 lg:col-span-3 p-5 rounded bg-steel-800">
        <h2 className="text-xl mb-3 font-semibold">Offers</h2>

        <OrderList type="sell" isPending={isPending} loggedIn={loggedIn} waterAccounts={waterAccounts} />
      </div>
      <div className="col-span-8">
        <TradesList trades={trades} isLoading={tradesLoading} limit="10" />
      </div>
    </div>
  );
};
