import React, { Component } from 'react';
import { Trade } from '../components';


class TradesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div className="table w-full transaction-list">
      <div className="table-row text-gray-800 font-semibold">
        <div className="table-cell px-5">Price / ML</div>
        <div className="table-cell px-5">Volume</div>
        <div className="table-cell px-5">From Zone</div>
        <div className="table-cell px-5">To Zone</div>
        <div className="hidden xl:table-cell px-5">Date</div>
      </div>

      {this.props.trades.map((trade, index) => <Trade key={index} trade={trade} />)}

    </div>
  );
  }
}
export default TradesList;
