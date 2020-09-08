import React from "react";
import { formatAmount, formatKilolitres, formatShortDate } from "../../utils/format";

const zones = [
  "Barron A - Barron Catchment",
  "Barron B - Tinaroo Dam",
  "Barron C - Lake Tinaroo Ponded Area",
  "Barron D - Lake Tinaroo Ponded Area",
  "Barron E - Walsh & Mitchell Catchments",
];

export default ({ trade }) => (
  <div className="table-row relative">
    <div className="row-cell-l table-cell">{formatAmount(trade.averagePrice)}</div>
    <div className="row-cell table-cell">{formatKilolitres(trade.quantity)}</div>
    <div className="row-cell table-cell">{zones[trade.fromZone]}</div>
    <div className="row-cell table-cell">{zones[trade.toZone]}</div>
    <div className="hidden xl:table-cell row-cell-r text-steel-300">{formatShortDate(new Date(trade.timeStamp))}</div>
  </div>
);
