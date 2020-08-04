import React, { Component } from "react";

import TradesList from "../history/TradesList";
import OrderList from "../orders/OrderList";
import AccountBanner from "./accountBanner/AccountBanner";

import Graph from "./Graph";
import WaterAccountsList from "./WaterAccountsList";
import OrderButton from "./OrderButton";
import { formatAmount, formatEthereumAddress } from "../../utils/format";

import SchemeImage from "../../images/mdwss-rnd.jpg";

class Dashboard extends Component {
  async componentDidMount() {
    this.props.fetchBuyOrders(10);
    this.props.fetchSellOrders(10);
    this.props.fetchTrades(10);
  }

  render() {
    const {
      ethContext,
      buys,
      sells,
      trades,
      openOrderForm,
      deleteBuyOrder,
      deleteSellOrder,
      scheme,
      setCurrentWaterAccount,
      waterAccounts,
      activeWaterAccount,
    } = this.props;
    return (
      <div className="py-5 px-5 lg:px-10 flex-grow pb-5">
        <AccountBanner ethContext={ethContext} />

        <div className="flex w-full">
          <div className="flex-auto w-1/4 p-5 steel-gradient mr-2 text-center flex flex-col scheme-panel">
            <img
              src={SchemeImage}
              className="border border-steel-100"
              style={{ borderRadius: "500px", width: "50%", margin: "auto" }}
              alt={scheme.schemeName}
            />

            <div className="flex-grow">
              <div className="my-4 text-xl scheme-name">{scheme.schemeName}</div>
              Last Traded Price
              <div className="text-4xl">{formatAmount(scheme.lastTradePrice)}</div>
              <div className="mb-3 text-xs text-steel-300">
                <span className="inline-block py-1 px-2 border rounded border-steel-300">
                  <i className="text-xs mr-2 fab fa-ethereum"></i>
                  {formatEthereumAddress(scheme.address)}
                </span>
              </div>
            </div>
            <div className="flex-shrink">
              {waterAccounts.length > 0 && <h4>Your Water Accounts</h4>}
              <WaterAccountsList
                setCurrentWaterAccount={setCurrentWaterAccount}
                waterAccounts={waterAccounts}
                activeWaterAccount={activeWaterAccount}
              />
            </div>
          </div>

          <div className="flex-auto w-3/4">
            <Graph />

            <h2 className="ml-2 pb-6 text-2xl">Order Book</h2>

            <div className="flex">
              <div className="w-full">
                <div className="flex flex-col xl:flex-row ">
                  <div className="flex-1 p-5 rounded bg-steel-800">
                    <h2 className="text-xl mb-3 font-semibold">Bids</h2>

                    <OrderList orders={buys} ethContext={ethContext} type="buy" openOrderForm={openOrderForm} deleteOrder={deleteBuyOrder} />
                    {ethContext.isSignedIn && (
                      <OrderButton
                        type="buy"
                        openOrderForm={() =>
                          openOrderForm({
                            type: "buy",
                            price: "",
                            quantity: "",
                          })
                        }
                      />
                    )}
                  </div>

                  <div className="p-5 rounded mr-1 flex-1 mt-3 xl:ml-1 xl:mt-0 bg-steel-800">
                    <h2 className="text-xl mb-3 font-semibold">Offers</h2>

                    <OrderList orders={sells} ethContext={ethContext} type="sell" openOrderForm={openOrderForm} deleteOrder={deleteSellOrder} />
                    {ethContext.isSignedIn && (
                      <OrderButton
                        type="sell"
                        openOrderForm={() =>
                          openOrderForm({
                            type: "sell",
                            price: "",
                            quantity: "",
                          })
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
  }
}
export default Dashboard;
