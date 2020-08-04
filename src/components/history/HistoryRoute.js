import React, { Component } from "react";

import TradesList from "./TradesList";
import PageHeader from "../app/PageHeader";

class TransactionsRoute extends Component {
  async componentDidMount() {
    this.props.loadTrades(100);
  }

  render() {
    return (
      <div className="p-10 flex-grow pb-5">
        <PageHeader header="Trade History" />
        <TradesList trades={this.props.trades} />
      </div>
    );
  }
}

export default TransactionsRoute;
