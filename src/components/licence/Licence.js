import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { serviceLoader } from "../../services/serviceLoader";
import WaterAccountsList from "../dashboard/WaterAccountsList";
import OrderList from "../orders/OrderList";
import TradesListHeader from "../history/TradesListHeader";
import TradesList from "../history/TradesList";

const historyService = serviceLoader("OrderHistory");
const orderBookService = serviceLoader("OrderBook");

export default () => {
  const ethContext = useSelector(state => state.ethContext);

  const [buys, setBuys] = useState([]);
  const [sells, setSells] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!ethContext.address) return;
      setBuys(await orderBookService.getLicenceBuyOrders(ethContext.address, 100));
      setSells(await orderBookService.getLicenceSellOrders(ethContext.address, 100));
      setTrades(await historyService.getLicenceHistory(ethContext.address, 100));
    };
    getData();
  }, [ethContext]);

  return (
    <div className="py-5 px-5 lg:px-10 flex-grow pb-5">
      <h2 className="pb-6 text-2xl">User and Account Details</h2>

      <p className="pb-3">
        View your history with Water Ledger, including your licence and water account details, and the details of orders and trades.
      </p>

      <h4 className="text-steel-600 text-lg mb-3">Your Water Accounts</h4>

      <div className="w-1/2">
        <WaterAccountsList />
      </div>

      <h2 className="mt-10 pb-6 text-2xl">Your Orders</h2>

      <div className="flex">
        <div className="w-full rounded p-5 bg-steel-800">
          <div className="flex flex-col xl:flex-row ">
            <div className="flex-1 mr-1">
              <div className="flex items-baseline">
                <h2 className="flex-grow inline-block text-steel-300 text-xl mb-3 font-semibold">Bids</h2>
              </div>
              <OrderList orders={buys} ethContext={ethContext} type="buy" />
            </div>

            <div className="flex-1 mt-3 xl:ml-1 xl:mt-0">
              <div className="flex flex-col items-baseline">
                <h2 className="flex-grow inline-block text-steel-300 text-xl mb-3 font-semibold">Offers</h2>
                <OrderList orders={sells} ethContext={ethContext} type="sell" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TradesListHeader showLink={false} />
      <TradesList trades={trades} />
    </div>
  );
};
