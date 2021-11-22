import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getSavedTerminologies } from "../queries";

import Trade from "./Trade";

export default ({ trades, isLoading = false, limit = null }) => {
  const { data: terminologies } = useQuery("getTerminologies", getSavedTerminologies);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="p-0 lg:p-5 rounded bg-steel-800">
      <h2 className="text-xl mb-3 ml-5 lg:ml-0 font-semibold">Recent Trades</h2>
      <table className="table relative w-full transaction-list ">
        <thead>
          <tr className="text-left font-semibold bg-steel-700">
            <th className="p-2">Price / {terminologies["unit"]}</th>
            <th className="p-2">Volume</th>
            <th className="p-2 lg:table-cell capitalize">From {terminologies["zone"]}</th>
            <th className="p-2 lg:table-cell capitalize">To {terminologies["zone"]}</th>
            <th className="xl:table-cell p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {trades.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 py-3 text-center">
                No Trades have been recorded
              </td>
            </tr>
          )}
          {trades.map((trade, index) => (
            <Trade key={index} trade={trade} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        {limit && (
          <Link to="/history" className="no-underline text-right p-4 py-3 mt-5 border-steel-300 text-steel-300 rounded">
            See All <i className="fal fa-arrow-right fa-fw"></i>
          </Link>
        )}
      </div>
    </div>
  );
};
