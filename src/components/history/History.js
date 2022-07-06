import React, { useContext } from "react";
import { useQuery } from "react-query";

import { getHistory } from "../queries";
import { UserContext } from "../contexts";

import PageHeader from "../app/PageHeader";
import TradesList from "./TradesList";

export default () => {
  const {
    login: { extractionRightId },
  } = useContext(UserContext);

  const { data: trades, isLoading } = useQuery(["getTrades", extractionRightId], () => getHistory(extractionRightId));

  return (
    <div className="p-5 lg:p-10 flex-grow pb-5">
      <PageHeader header="Trade History" />
      <TradesList trades={trades} isLoading={isLoading} />
    </div>
  );
};
