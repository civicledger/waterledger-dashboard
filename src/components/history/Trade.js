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
      <td>{formatAmount(trade.averagePrice)}</td>
      <td>{formatKilolitres(trade.quantity)}</td>
      <td>{zones[trade.fromZone]}</td>
      <td>{zones[trade.toZone]}</td>
      <td className="text-steel-300">{formatShortDate(new Date(trade.timeStamp))}</td>
    </tr>
  );
};

export default Trade;
