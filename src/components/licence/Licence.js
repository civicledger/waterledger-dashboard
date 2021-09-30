import React, { useContext } from "react";
import { useQuery } from "react-query";
import WaterAccountsList from "../dashboard/WaterAccountsList";
import OrderList from "../orders/OrderList";
import TradesListHeader from "../history/TradesListHeader";
import TradesList from "../history/TradesList";
import { getHistory, getLicence } from "../queries";
import { UserContext } from "../contexts";

export default () => {
  const {
    login: { licenceId, loggedIn },
  } = useContext(UserContext);

  const { data: trades } = useQuery(["getTrades", licenceId], () => getHistory(licenceId), { keepPreviousData: true });
  const { data: licence } = useQuery(["getLicence", licenceId], () => getLicence(licenceId), { keepPreviousData: true });

  if (!trades || !licence) return "";

  return (
    <div className="py-5 px-5 lg:px-10 flex-grow pb-5">
      <h2 className="pb-6 text-2xl">User and Account Details</h2>
      <p className="pb-3">
        View your history with Water Ledger, including your licence and water account details, and the details of orders and trades.
      </p>
      <h4 className="text-steel-600 text-lg mb-3">Your Water Accounts</h4>
      <div className="w-full lg:w-1/2">
        <WaterAccountsList />
      </div>

      <h2 className="mt-10 pb-6 text-2xl">Your Orders</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 md:col-span-1 rounded p-5 bg-steel-800">
          <h2 className="text-steel-300 text-xl mb-3 font-semibold">Bids</h2>
          <OrderList
            type="buy"
            isPending={licence.status === 1}
            loggedIn={loggedIn}
            waterAccounts={licence.accounts}
            button={false}
            licenceId={licenceId}
          />
        </div>

        <div className="col-span-2 md:col-span-1 rounded p-5 bg-steel-800">
          <h2 className="text-steel-300 text-xl mb-3 font-semibold">Offers</h2>
          <OrderList
            type="sell"
            isPending={licence.status === 1}
            loggedIn={loggedIn}
            waterAccounts={licence.accounts}
            button={false}
            licenceId={licenceId}
          />
        </div>
      </div>

      <TradesListHeader showLink={false} />
      <TradesList trades={trades} />
    </div>
  );
};
