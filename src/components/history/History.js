import React from "react";
import { useQuery } from "react-query";

import { getHistory } from "../queries";

import PageHeader from "../app/PageHeader";
import TradesList from "./TradesList";

export default props => {
  const { data: trades, isLoading } = useQuery(["getTrades"], getHistory);
  return (
    <div className="p-5 lg:p-10 flex-grow pb-5">
      <PageHeader header="Trade History" />
      <TradesList trades={trades} isLoading={isLoading} />
    </div>
  );
};
