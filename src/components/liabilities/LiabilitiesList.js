import React from "react";
import { formatAmount, formatShortDateObject } from "../../utils/format";

const statuses = ["Cancelled", "Pending", "Paid", "Finalised"];

export default ({ liabilities, isLoading }) => {
  if (isLoading) {
    return <div>loading</div>;
  }
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
            <div className="row-cell table-cell">{liability.seller}</div>
            <div className="row-cell table-cell">{liability.buyer}</div>
            <div className="row-cell table-cell">{formatAmount(liability.price)}</div>
            <div className="row-cell table-cell">{statuses[liability.status]}</div>
            <div className="hidden xl:table-cell row-cell-r text-steel-300">{formatShortDateObject(liability.createdAt)}</div>
          </div>
        );
      })}
    </div>
  );
};
