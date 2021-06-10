import React, { useContext } from "react";
import { useQuery } from "react-query";

import { getHistory } from "../queries";
import { UserContext } from "../contexts";

import PageHeader from "../app/PageHeader";
import TradesList from "./TradesList";

export default () => {
  const {
    login: { licenceId },
  } = useContext(UserContext);

  const { data: trades, isLoading } = useQuery(["getTrades", licenceId], () => getHistory(licenceId));

  return (
    <div className="p-5 lg:p-10 flex-grow pb-5">
      <PageHeader header="Trade History" />
      <TradesList trades={trades} isLoading={isLoading} />
    </div>
  );
};
