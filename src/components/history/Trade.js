import React from "react";
import { formatAmount, formatKilolitres, formatShortDateObject } from "../../utils/format";
import { queryClient } from "../queries";

const Trade = ({ trade }) => {
  const { terminologies } = queryClient.getQueryData("getTerminologies");
  return (
    <tr>
      <td className="p-2 pb-1">{formatAmount(trade.price)}</td>
      <td className="p-2 pb-1">{formatKilolitres(trade.quantity, terminologies["unit"])}</td>
      <td className="p-2 pb-1">{trade.sellerAccount.zone.name}</td>
      <td className="p-2 pb-1">{trade.buyerAccount.zone.name}</td>
      <td className="p-2 pb-1 text-steel-300">{formatShortDateObject(trade.createdAt)}</td>
    </tr>
  );
};

export default Trade;
