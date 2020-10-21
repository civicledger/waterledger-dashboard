import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";

import { getOrders, getHistory } from "../queries";
import TradesList from "../history/TradesList";
import OrderList from "../orders/OrderList";
import AccountBanner from "./accountBanner/AccountBanner";
import Scheme from "./Scheme";

import Graph from "./Graph";

import OrderButton from "./OrderButton";

import { openOrderForm, deleteOrder } from "../../redux/actions/orders";

export default props => {
  const dispatch = useDispatch();

  const ethContext = useSelector(state => state.ethContext);
  const { data: buyOrders, isLoading: buysLoading } = useQuery(["getOrders", "buy"], getOrders);
  const { data: sellOrders, isLoading: sellsLoading } = useQuery(["getOrders", "sell"], getOrders);
  const { data: trades, isLoading: tradesLoading } = useQuery(["getTrades"], getHistory);
  return (
    <div className="py-5 px-5 lg:px-10 flex-grow pb-5">
      <AccountBanner ethContext={ethContext} />
      <div className="flex flex-col lg:flex-row w-full">
        <Scheme />

        <div className="flex-auto w-full lg:w-3/4">
          <Graph />

          <h2 className="lg:ml-2 pb-3 lg:pb-6 text-2xl">Order Book</h2>

          <div className="flex">
            <div className="w-full">
              <div className="flex flex-col xl:flex-row ">
                <div className="flex-1 p-0 pt-3 lg:p-5 rounded bg-steel-800">
                  <h2 className="text-xl mb-3 ml-5 lg:ml-0 font-semibold">Bids</h2>

                  <OrderList orders={buyOrders} ethContext={ethContext} type="buy" deleteOrder={deleteOrder} isLoading={buysLoading} />
                  {ethContext.isSignedIn && (
                    <OrderButton
                      type="buy"
                      openOrderForm={() =>
                        dispatch(
                          openOrderForm({
                            type: "buy",
                            price: "",
                            quantity: "",
                          })
                        )
                      }
                    />
                  )}
                </div>

                <div className="rounded mr-0 lg:mr-1 flex-1 p-0 pt-3 lg:p-5 mt-3 xl:ml-1 xl:mt-0 bg-steel-800">
                  <h2 className="text-xl mb-3 ml-5 lg:ml-0 font-semibold">Offers</h2>

                  <OrderList orders={sellOrders} ethContext={ethContext} type="sell" deleteOrder={deleteOrder} isLoading={sellsLoading} />
                  {ethContext.isSignedIn && (
                    <OrderButton
                      type="sell"
                      openOrderForm={() =>
                        dispatch(
                          openOrderForm({
                            type: "sell",
                            price: "",
                            quantity: "",
                          })
                        )
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TradesList trades={trades} isLoading={tradesLoading} limit="10" />
    </div>
  );
};
