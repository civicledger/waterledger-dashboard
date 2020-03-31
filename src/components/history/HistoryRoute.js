import React, { Component } from 'react';

import { TradesList, PageHeader } from '../components';

class TransactionsRoute extends Component {

  async componentDidMount() {
    this.props.loadTrades(100);
  }

  render() {
    return (<div className="p-10 bg-gray-100 flex-grow pb-5">
      <PageHeader header="Trade History" />
      <TradesList trades={this.props.trades} />
    </div>);
  }
}

export default TransactionsRoute;