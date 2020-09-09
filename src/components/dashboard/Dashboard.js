import React from "react";
import { useSelector, useDispatch } from "react-redux";

import TradesList from "../history/TradesList";
import OrderList from "../orders/OrderList";
import AccountBanner from "./accountBanner/AccountBanner";

import Graph from "./Graph";
import WaterAccountsList from "./WaterAccountsList";
import OrderButton from "./OrderButton";
import { formatAmount, formatEthereumAddress } from "../../utils/format";

import SchemeImage from "../../images/mdwss-rnd.jpg";

import { openOrderForm, deleteBuyOrder, deleteSellOrder } from "../../redux/actions/orders";

export default props => {
  const dispatch = useDispatch();

  const buyOrders = useSelector(state => state.buys);
  const sellOrders = useSelector(state => state.sells);
  const trades = useSelector(state => state.trades);
  const ethContext = useSelector(state => state.ethContext);
  const scheme = useSelector(state => state.scheme);
  const waterAccounts = useSelector(state => state.waterAccounts);

  return (
    <div className="py-5 px-5 lg:px-10 flex-grow pb-5">
      <AccountBanner ethContext={ethContext} />
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex-auto w-full flex-wrap lg:w-1/4 p-0 lg:p-5 steel-gradient mr-0 lg:mr-2 text-center flex flex-row lg:flex-col scheme-panel">
          <div className="w-1/3 lg:w-full pr-2 lg:pr-0">
            <img
              src={SchemeImage}
              className="border border-steel-100 w-full lg:w-1/2 lg:mx-auto"
              style={{ borderRadius: "500px" }}
              alt={scheme.schemeName}
            />
          </div>

          <div className="w-2/3 lg:w-full lg:flex-grow lg:mt-5">
            <div className="my-4 text-lg lg:text-xl scheme-name mt-0">{scheme.schemeName}</div>
            Last Traded Price
            <div className="txt-xl lg:text-4xl">{formatAmount(scheme.lastTradePrice)}</div>
            <div className="mb-3 text-xs text-steel-300 hidden lg:block">
              <span className="inline-block py-1 px-2 border rounded border-steel-300">
                <i className="text-xs mr-2 fab fa-ethereum"></i>
                {formatEthereumAddress(scheme.address)}
              </span>
            </div>
          </div>
          <div className="w-full mb-5 lg:mb-0">
            {waterAccounts.length > 0 && (
              <h4 className="text-left mt-5 ml-2 font-semibold lg:font-normal lg:ml-0 lg:mt-0 lg:text-center">Your Water Accounts</h4>
            )}
            <WaterAccountsList />
          </div>
        </div>

        <div className="flex-auto w-full lg:w-3/4">
          <Graph />

          <h2 className="lg:ml-2 pb-3 lg:pb-6 text-2xl">Order Book</h2>

          <div className="flex">
            <div className="w-full">
              <div className="flex flex-col xl:flex-row ">
                <div className="flex-1 p-0 pt-3 lg:p-5 rounded bg-steel-800">
                  <h2 className="text-xl mb-3 ml-5 lg:ml-0 font-semibold">Bids</h2>

                  <OrderList orders={buyOrders} ethContext={ethContext} type="buy" deleteOrder={deleteBuyOrder} />
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

                  <OrderList orders={sellOrders} ethContext={ethContext} type="sell" deleteOrder={deleteSellOrder} />
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
      <TradesList trades={trades} />
    </div>
  );
};
