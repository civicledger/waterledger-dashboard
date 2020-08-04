import React, { Component } from "react";
import { connect } from "react-redux";
import { serviceLoader } from "../../services/serviceLoader";
import WaterAccountsList from "../dashboard/WaterAccountsList";
import OrderList from "../orders/OrderList";
import TradesListHeader from "../history/TradesListHeader";
import TradesList from "../history/TradesList";

const historyService = serviceLoader("OrderHistory");
const orderBookService = serviceLoader("OrderBook");

class Licence extends Component {
  state = { buys: [], sells: [], trades: [] };

  async componentDidMount() {
    const { address } = this.props.ethContext;

    if (!address) {
      window.location = "/";
    }

    const buys = await orderBookService.getLicenceBuyOrders(address, 10);
    const sells = await orderBookService.getLicenceSellOrders(address, 10);
    const trades = await historyService.getLicenceHistory(address, 10);
    this.setState({ buys, sells, trades });
  }

  render() {
    return (
      <div className="py-5 px-5 lg:px-10 flex-grow pb-5">
        <h2 className="pb-6 text-2xl">User and Account Details</h2>

        <p className="pb-3">
          View your history with Water Ledger, including your licence and water account details, and the details of orders and trades.
        </p>

        {/* <h4 className="text-steel-600 text-lg mb-3">Your Account Details</h4>

        {this.props.licence} */}

        <h4 className="text-steel-600 text-lg mb-3">Your Water Accounts</h4>

        <div className="w-1/2">
          <WaterAccountsList waterAccounts={this.props.waterAccounts} showId={true} />
        </div>

        <h2 className="mt-10 pb-6 text-2xl">Your Orders</h2>

        <div className="flex">
          <div className="w-full rounded p-5 bg-steel-800">
            <div className="flex flex-col xl:flex-row ">
              <div className="flex-1 mr-1">
                <div className="flex items-baseline">
                  <h2 className="flex-grow inline-block text-steel-300 text-xl mb-3 font-semibold">Bids</h2>
                </div>
                <OrderList orders={this.state.buys} ethContext={this.props.ethContext} type="buy" />
              </div>

              <div className="flex-1 mt-3 xl:ml-1 xl:mt-0">
                <div className="flex flex-col items-baseline">
                  <h2 className="flex-grow inline-block text-steel-300 text-xl mb-3 font-semibold">Offers</h2>
                  <OrderList orders={this.state.sells} ethContext={this.props.ethContext} type="sell" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <TradesListHeader showLink={false} />
        <TradesList trades={this.state.trades} />
      </div>
    );
  }
}

const mapStateToProps = ({ licence, waterAccounts, ethContext }) => ({
  licence,
  waterAccounts,
  ethContext,
});

export default connect(mapStateToProps)(Licence);
