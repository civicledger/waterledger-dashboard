import React from "react";
import { useQuery } from "react-query";
import { formatAmount, formatKilolitres, formatShortDateObject } from "../../utils/format";
import { getSavedTerminologies } from "../queries";

const statuses = ["Pending", "Completed", "Rejected", "Invalid"];

const Trade = ({ trade }) => {
  const { data: terminologies } = useQuery("getTerminologies", getSavedTerminologies);

  return (
    <tr>
      <td className="p-2 pb-1">{formatAmount(trade.price)}</td>
      <td className="p-2 pb-1">{formatKilolitres(trade.quantity, terminologies["unit"])}</td>
      <td className="p-2 pb-1">{trade.sellerAccount.level0Resource.name}</td>
      <td className="p-2 pb-1">{trade.buyerAccount.level0Resource.name}</td>
      <td className="p-2 pb-1">{statuses[trade.status]}</td>
      <td className="p-2 pb-1 text-steel-300">{formatShortDateObject(trade.createdAt)}</td>
    </tr>
  );
};

export default Trade;
