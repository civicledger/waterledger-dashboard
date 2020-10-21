import React from "react";
import { Link } from "react-router-dom";

import Trade from "./Trade";

export default ({ trades, isLoading = false, limit = null }) => {

  if(isLoading){
    return <div>loading</div>;
  }

  return (
  <div className="p-0 pt-3 lg:p-5 mt-3 rounded bg-steel-800 lg:p-5">
    <h2 className="text-xl mb-3 ml-5 lg:ml-0 font-semibold">Recent Trades</h2>
    <table className="table relative w-full transaction-list ">
      <thead>
        <tr className="text-leftfont-semibold bg-steel-700">
          <th className="p-2">Price / ML</th>
          <th className="p-2">Volume</th>
          <th className="p-2 hidden lg:table-cell">From Zone</th>
          <th className="p-2 hidden lg:table-cell">To Zone</th>
          <th className="hidden xl:table-cell p-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {trades.length === 0 && (
          <tr>
            <td colSpan="5" className="p-5 pb-0 text-center">
              No Trades have been recorded
            </td>
          </tr>
        )}
        {trades.map((trade, index) => (
          <Trade key={index} trade={trade} />
        ))}
      </tbody>
    </table>
    <div className="w-full flex justify-end">
      <Link to="/history" className="no-underline text-right mr-3 mb-3 p-2 px-3 mt-5 border-steel-300 text-steel-300 rounded">
        See All <i className="fal fa-arrow-right fa-fw"></i>
      </Link>
    </div>
  </div>

)};
