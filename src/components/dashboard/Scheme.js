import React from "react";
import { useQuery } from "react-query";

import { getScheme } from "../queries";

import { formatAmount, formatEthereumAddress } from "../../utils/format";
import SchemeImage from "../../images/mdwss-rnd.jpg";

export default props => {
  let { data: scheme } = useQuery("getScheme", getScheme, {
    keepPreviousData: true,
  });
  if (scheme === undefined) scheme = { lastTradedPrice: 0, name: "", orderbookDeployment: { address: "" } };

  return (
    <div className="text-center">
      <div className="w-full pr-0">
        <img src={SchemeImage} className="border border-steel-100 mx-auto" style={{ borderRadius: "500px" }} alt={scheme.name} />
      </div>

      <div className="w-full mt-5">
        <div className="xl:my-4 text-xl scheme-name mt-0">{scheme.name}</div>
        Last Traded Price / ML
        <div className="text-xl lg:text-4xl">{formatAmount(scheme.lastTradedPrice ?? 0)}</div>
        <div className="mb-3 text-xs xl:text-lg text-steel-300">
          <span className="py-1 px-2 border rounded border-steel-300">
            <i className="text-xs xl:text-lg mr-2 fab fa-ethereum"></i>
            {formatEthereumAddress(scheme.orderbookDeployment.address)}
          </span>
        </div>
      </div>
    </div>
  );
};
