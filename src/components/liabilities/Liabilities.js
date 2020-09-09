import React, { useEffect, useState } from "react";

import PageHeader from "../app/PageHeader";
import LiabilityService from "../../services/LiabilityService";
import LiabilitiesList from "./LiabilitiesList";
const liabilitysvc = new LiabilityService();

export default props => {
  const [liabilities, setLiabilities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLiabilities(await liabilitysvc.apiGetLiabilities());
    };
    getData();
  }, []);

  return (
    <div className="p-5 lg:p-10 flex-grow pb-5">
      <PageHeader header="Liabilities" />

      <LiabilitiesList liabilities={liabilities} />
    </div>
  );
};
