import React from "react";
import { formatAmount, formatKilolitres, formatShortDate } from "../../utils/format";

const zones = [
  "Barron A - Barron Catchment",
  "Barron B - Tinaroo Dam",
  "Barron C - Lake Tinaroo Ponded Area",
  "Barron D - Lake Tinaroo Ponded Area",
  "Barron E - Walsh & Mitchell Catchments",
];

const Trade = ({ trade }) => {
  return (
    <tr>
      <td className="p-2 pb-1">{formatAmount(trade.averagePrice)}</td>
      <td className="p-2 pb-1">{formatKilolitres(trade.quantity)}</td>
      <td className="p-2 pb-1">{zones[trade.fromZone]}</td>
      <td className="p-2 pb-1">{zones[trade.toZone]}</td>
      <td className="p-2 pb-1 text-steel-300">{formatShortDate(new Date(trade.timeStamp))}</td>
    </tr>
  );
};

export default Trade;
