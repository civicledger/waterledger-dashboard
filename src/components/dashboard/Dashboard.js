import React, { Component } from 'react';

import { TradesList, TradesListHeader, OrderList, AccountBanner } from '../components';
import OrderButton from './OrderButton';

class Dashboard extends Component {

  async componentDidMount() {
    this.props.fetchBuyOrders(10);
    this.props.fetchSellOrders(10);
    this.props.fetchTrades(10);
  }

  render() {
    const { loading, ethContext, buys, sells, trades, setAccountModal, setPasswordModal, openOrderForm, deleteBuyOrder, deleteSellOrder } = this.props;

    return (<div className="py-5 px-10 bg-gray-100 flex-grow pb-5">

      <AccountBanner ethContext={ethContext}
        setAccountModal={setAccountModal}
        setPasswordModal={setPasswordModal} />

      <h2 className="mt-10 pb-6 text-2xl">Order Book</h2>

      <div className="flex">
        <div className="w-full border rounded p-5 bg-white">
          <div className="flex flex-col xl:flex-row ">
            <div className="flex-1 mr-1">
              <div className="flex items-baseline">
                <h2 className="flex-grow inline-block text-blue-500 text-xl mb-3 font-semibold">Bids</h2>
                { loading.buys && <span className="flex-shrink mr-5 text-gray-500">Checking for updates
                  <i className="fab fa-ethereum faa-flash ml-1 text-gray-500"></i>
                </span> }
              </div>

              <OrderList orders={buys} ethContext={ethContext} type='buy' showPeriod={true} openOrderForm={openOrderForm} deleteOrder={deleteBuyOrder} />
            </div>

            <div className="flex-1 mt-3 xl:ml-1 xl:mt-0">
              <div className="flex flex-col items-baseline">
                <h2 className="flex-grow inline-block text-blue-500 text-xl mb-3 font-semibold">Offers</h2>
                { loading.sells && <span className="flex-shrink mr-5 text-gray-500">Checking for updates
                  <i className="fab fa-ethereum faa-flash ml-1 text-gray-500"></i>
                </span> }

                <OrderList orders={sells} ethContext={ethContext} type='sell' openOrderForm={openOrderForm} deleteOrder={deleteSellOrder} />
              </div>
            </div>
          </div>

          { ethContext.isSignedIn && <div className="flex">
            <OrderButton type="buy" openOrderForm={() => openOrderForm({type: 'buy', price: '', quantity: ''})}  />
            <OrderButton type="sell" openOrderForm={() => openOrderForm({type: 'sell', price: '', quantity: ''})} />
          </div> }

        </div>
      </div>

      <TradesListHeader showLink={true} loading={loading.trades} />
      <TradesList trades={trades} />
    </div>);
  }
}
export default Dashboard;