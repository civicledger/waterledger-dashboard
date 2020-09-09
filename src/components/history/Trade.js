import React from "react";
import { formatAmount, formatNumber, formatShortDate } from "../../utils/format";
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
      <td className="">{formatAmount(trade.averagePrice)}</td>
      <td className="">{formatNumber(trade.quantity)} ML</td>
      <td className="">{zones[trade.fromZone]}</td>
      <td className="">{zones[trade.toZone]}</td>
      <td className="text-steel-300">{formatShortDate(new Date(trade.timeStamp))}</td>
    </tr>
  );
};

export default Trade;
