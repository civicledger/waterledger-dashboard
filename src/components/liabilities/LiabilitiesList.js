import React from "react";

import { formatAmount, formatShortDateObject } from "../../utils/format";

export default ({ liabilities }) => {
  return (
    <div className="table relative w-full transaction-list mt-5 bg-steel-800 rounded p-5">
      <h2 className="text-2xl mb-3">Your Liabilities</h2>
      <div className="table-row font-semibold bg-steel-700">
        <div className="table-cell p-2">From</div>
        <div className="table-cell p-2">To</div>
        <div className="table-cell p-2">Amount</div>
        <div className="table-cell p-2">Status</div>
        <div className="hidden xl:table-cell p-2">Date</div>
      </div>

      {liabilities.length === 0 && (
        <div className="table-row relative">
          <div className="row-cell table-cell"></div>
          <div className="row-cell table-cell"></div>
          <div className="row-cell table-cell text-center">No liabilities found</div>
          <div className="row-cell table-cell"></div>
          <div className="row-cell table-cell"></div>
        </div>
      )}

      {liabilities.map(liability => {
        return (
          <div className="table-row relative" key={liability.id}>
            <div className="row-cell table-cell">{liability.from}</div>
            <div className="row-cell table-cell">{liability.to}</div>
            <div className="row-cell table-cell">{formatAmount(liability.amount)}</div>
            <div className="row-cell table-cell">{liability.status}</div>
            <div className="hidden xl:table-cell row-cell-r text-steel-300">{formatShortDateObject(new Date(liability.timestamp))}</div>
          </div>
        );
      })}
    </div>
  );
};
