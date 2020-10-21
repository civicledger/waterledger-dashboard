import React from "react";
import { formatAmount, formatKilolitres, formatShortDateObject } from "../../utils/format";

const Trade = ({ trade }) => {
  return (
    <tr>
      <td className="p-2 pb-1">{formatAmount(trade.price)}</td>
      <td className="p-2 pb-1">{formatKilolitres(trade.quantity)}</td>
      <td className="p-2 pb-1">{trade.fromZone}</td>
      <td className="p-2 pb-1">{trade.toZone}</td>
      <td className="p-2 pb-1 text-steel-300">{formatShortDateObject(trade.createdAt)}</td>
    </tr>
  );
};

export default Trade;
