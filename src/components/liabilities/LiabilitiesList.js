import React from "react";
import { formatAmount, formatShortDateObject } from "../../utils/format";

const statuses = ["Cancelled", "Pending", "Paid", "Finalised"];

export default ({ liabilities, isLoading }) => {
  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <div className="p-0 pt-3 lg:p-5 mt-3 rounded bg-steel-800 lg:p-5">
      <h2 className="text-xl mb-3 ml-5 lg:ml-0 font-semibold">Your Liabilities</h2>
      <table className="table relative w-full transaction-list ">
        <thead>
          <tr className="text-left font-semibold bg-steel-700">
            <th className="p-2">From</th>
            <th className="p-2">To</th>
            <th className="p-2 lg:table-cell">Amount</th>
            <th className="p-2 lg:table-cell">Status</th>
            <th className="xl:table-cell p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {liabilities.length === 0 && (
            <tr>
              <td colSpan="5" className="p-5 pb-0 text-center">
                No liabilities found
              </td>
            </tr>
          )}
          {liabilities.map(liability => (
            <tr key={liability.id}>
              <td className="p-2 pb-1">{liability.seller}</td>
              <td className="p-2 pb-1">{liability.buyer}</td>
              <td className="p-2 pb-1">{formatAmount(liability.price)}</td>
              <td className="p-2 pb-1">{statuses[liability.status]}</td>
              <td className="p-2 pb-1">{formatShortDateObject(liability.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
