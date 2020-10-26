import React from "react";
import { useQuery } from "react-query";
import { getLiabilities } from "../queries";

import PageHeader from "../app/PageHeader";
import LiabilitiesList from "./LiabilitiesList";

export default props => {
  const { data: liabilities, isLoading } = useQuery(["getLiabilities"], getLiabilities, { keepPreviousData: true });
  return (
    <div className="p-5 lg:p-10 flex-grow pb-5">
      <PageHeader header="Liabilities" />

      <LiabilitiesList liabilities={liabilities} isLoading={isLoading} />
    </div>
  );
};
