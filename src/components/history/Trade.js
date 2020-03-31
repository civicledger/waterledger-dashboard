import React from 'react';
import { formatAmount, formatRelativeDate, formatNumber } from '../../utils/format';
const zones = ['Barron Zone A', 'Barron Zone B', 'Barron Zone C', 'Barron Zone D', 'Barron Zone E'];
const Trade = ({trade}) => {
  return (
    <div className="table-row bg-white relative">
      <div className="row-cell-l border-r-1 rounded-r-lg table-cell lg:border-r-0 lg:rounded-none">{formatAmount(trade.averagePrice)}</div>
      <div className="row-cell border-r-0 table-cell">{formatNumber(trade.quantity)} ML</div>
      <div className="row-cell border-r-0 table-cell">{zones[trade.fromZone]}</div>
      <div className="row-cell border-r-0 table-cell">{zones[trade.toZone]}</div>
      <div className="hidden xl:table-cell row-cell-r text-gray-500 ">{formatRelativeDate(new Date(trade.timeStamp * 1000))}</div>
    </div>
  );
}

export default Trade;