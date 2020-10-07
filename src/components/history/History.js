import React, { useState, useEffect } from "react";

import PageHeader from "../app/PageHeader";
import TradesList from "./TradesList";
import OrderHistoryService from "../../services/OrderHistoryService";
const orderHistorysvc = new OrderHistoryService();

export default props => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const getTrades = async () => {
      setTrades(await orderHistorysvc.getHistory(10));
    };
    getTrades();
  }, []);

  return (
    <div className="p-5 lg:p-10 flex-grow pb-5">
      <PageHeader header="Trade History" />
      <TradesList trades={trades} />
    </div>
  );
};
