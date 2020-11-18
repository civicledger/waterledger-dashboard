import React from "react";
import { useQuery } from "react-query";

import { getScheme } from "../queries";

import WaterAccountsList from "./WaterAccountsList";
import { formatAmount, formatEthereumAddress } from "../../utils/format";
import SchemeImage from "../../images/mdwss-rnd.jpg";

export default props => {
  let { data: scheme } = useQuery("getScheme", getScheme, {
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (scheme === undefined) scheme = { lastTradedPrice: 0, name: "", orderbookDeployment: { address: "" } };

  return (
    <div className="flex-auto w-full flex-wrap lg:w-1/4 p-0 lg:p-5 steel-gradient mr-0 lg:mr-2 text-center flex flex-row lg:flex-col scheme-panel">
      <div className="w-1/3 lg:w-full pr-2 lg:pr-0">
        <img src={SchemeImage} className="border border-steel-100 w-full lg:w-1/2 lg:mx-auto" style={{ borderRadius: "500px" }} alt={scheme.name} />
      </div>

      <div className="w-2/3 lg:w-full lg:flex-grow lg:mt-5">
        <div className="my-4 text-lg lg:text-xl scheme-name mt-0">{scheme.name}</div>
        Last Traded Price
        <div className="txt-xl lg:text-4xl">{formatAmount(scheme.lastTradedPrice ?? 0)}</div>
        <div className="mb-3 text-xs text-steel-300 hidden lg:block">
          <span className="inline-block py-1 px-2 border rounded border-steel-300">
            <i className="text-xs mr-2 fab fa-ethereum"></i>
            {formatEthereumAddress(scheme.orderbookDeployment.address)}
          </span>
        </div>
      </div>
      <div className="w-full mb-5 lg:mb-0">
        <WaterAccountsList />
      </div>
    </div>
  );
};
