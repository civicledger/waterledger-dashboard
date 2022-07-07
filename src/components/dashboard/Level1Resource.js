import React from "react";
import { useQuery } from "react-query";

import WaterAccountsList from "./WaterAccountsList";
import { formatAmount, formatEthereumAddress } from "../../utils/format";
import { getSavedTerminologies, getLevel1Resource } from "../queries";

export default props => {
  const { data: terminologies } = useQuery("getTerminologies", getSavedTerminologies);

  let { data: level1Resource } = useQuery("getLevel1Resource", getLevel1Resource, { keepPreviousData: true });
  if (level1Resource === undefined) level1Resource = { lastTradedPrice: 0, name: "", deployments: [{ details: { address: "" } }] };

  return (
    <div className="col-span-8 flex flex-col justify-center justify-between steel-gradient rounded text-center lg:row-span-3 lg:col-span-2">
      <div className="w-full">
        {level1Resource.image && (
          <div className="p-5">
            <img src={level1Resource.image} className="border border-steel-100 mx-auto" style={{ borderRadius: "500px" }} alt={level1Resource.name} />
          </div>
        )}

        <div className="mt-5">
          <div className="text-xl level1resource-name mt-0">{level1Resource.name}</div>
          Last Traded Price / {terminologies["unit"]}
          <div className="text-xl lg:text-4xl">{formatAmount(level1Resource.lastTradedPrice ?? 0)}</div>
          <div className="mb-3 text-sm xl:text-lg text-steel-300">
            <span className="py-1 px-2 border rounded border-steel-300">
              <i className="text-sm xl:text-lg mr-2 fab fa-ethereum"></i>
              {formatEthereumAddress(level1Resource.deployments[0].details.address)}
            </span>
          </div>
        </div>
      </div>
      <WaterAccountsList />
    </div>
  );
};
