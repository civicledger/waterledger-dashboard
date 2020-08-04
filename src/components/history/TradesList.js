import React, { Component } from "react";
import { Link } from "react-router-dom";

import Trade from "./Trade";

class TradesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="table relative w-full transaction-list mt-5 bg-steel-800 rounded p-5 pb-20">
        <h2 className="flex-grow text-2xl inline-block mb-3">Recent Trades</h2>
        <div className="table-row font-semibold bg-steel-700">
          <div className="table-cell p-2">Price / ML</div>
          <div className="table-cell p-2">Volume</div>
          <div className="table-cell p-2">From Zone</div>
          <div className="table-cell p-2">To Zone</div>
          <div className="hidden xl:table-cell p-2">Date</div>
        </div>

        {this.props.trades.map((trade, index) => (
          <Trade key={index} trade={trade} />
        ))}

        <Link to="/history" className="absolute right-0 mr-5 no-underline text-right p-3 mt-5 border-steel-300 text-steel-300 rounded">
          See All <i className="fal fa-arrow-right fa-fw"></i>
        </Link>
      </div>
    );
  }
}
export default TradesList;
