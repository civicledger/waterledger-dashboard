import React, { useContext } from "react";
import { useQuery } from "react-query";

import WaterAccountsList from "./WaterAccountsList";
import { formatAmount, formatEthereumAddress } from "../../utils/format";
import { TerminologyContext } from "../contexts";
import { getScheme } from "../queries";

export default props => {
  const { terminologies } = useContext(TerminologyContext);
  let { data: scheme } = useQuery("getScheme", getScheme, { keepPreviousData: true });
  if (scheme === undefined) scheme = { lastTradedPrice: 0, name: "", orderbookDeployment: { address: "" } };

  return (
    <div className="col-span-8 flex flex-col justify-center justify-between steel-gradient rounded text-center lg:row-span-3 lg:col-span-2">
      <div className="w-full">
        {scheme.image && (
          <div className="p-5">
            <img src={scheme.image} className="border border-steel-100 mx-auto" style={{ borderRadius: "500px" }} alt={scheme.name} />
          </div>
        )}

        <div className="mt-5">
          <div className="text-xl scheme-name mt-0">{scheme.name}</div>
          Last Traded Price / {terminologies["ML"]}
          <div className="text-xl lg:text-4xl">{formatAmount(scheme.lastTradedPrice ?? 0)}</div>
          <div className="mb-3 text-sm xl:text-lg text-steel-300">
            <span className="py-1 px-2 border rounded border-steel-300">
              <i className="text-sm xl:text-lg mr-2 fab fa-ethereum"></i>
              {formatEthereumAddress(scheme.orderbookDeployment.address)}
            </span>
          </div>
        </div>
      </div>
      <WaterAccountsList />
    </div>
  );
};
