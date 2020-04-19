import React from 'react';
import { formatAmount, formatRelativeDate, formatNumber } from '../../utils/format';
import classNames from 'classnames';

const orderTypes = ["Offer", "Bid"];
const orderTypesInternal = ["sell", "buy"];

const zones = ['Barron Zone A', 'Barron Zone B', 'Barron Zone C', 'Barron Zone D', 'Barron Zone E'];
const periods = ['', 'Three Months', 'Six Months', 'Nine Months', 'A Year or More'];

export default ({order, showType=false, showTimestamp=false, showPeriod=false, ethContext: {address, isReadOnly}, highlightRow, openOrderForm, deleteOrder}) => {

  let { orderType:type, price, quantity, timeStamp, period } = order;

  const typeInternal = orderTypesInternal[type];
  const matchingType = typeInternal === 'buy' ? 'sell' : 'buy';

  const isOwner = address === order.owner;

  const classNameObject = {
    'order-row': true,
    'text-gray-500': isOwner,
    'cursor-pointer': highlightRow && !isReadOnly,
    'hover:bg-green-300': highlightRow && !isReadOnly && typeInternal === 'buy',
    'hover:text-green-600': highlightRow && !isReadOnly && typeInternal === 'buy',
    'hover:bg-red-300': highlightRow && !isReadOnly && typeInternal === 'sell',
    'hover:text-red-600': highlightRow && !isReadOnly && typeInternal === 'sell',
  };

  return <tr
    className={ classNames(classNameObject) }
    onClick={() => {
      if (!highlightRow || isReadOnly) return;
      openOrderForm({type: matchingType, price, quantity});
    }}>
    {showType && <td className="py-2">{orderTypes[type]}</td>}
    <td className="py-2">{formatAmount(price)}</td>
    <td className="py-2">{formatNumber(quantity)} ML</td>
    <td className="py-2">{zones[order.zone]}</td>
    {showPeriod && <td className="py-2">{periods[period]}</td> }
    {showTimestamp && <td className="py-2">{formatRelativeDate(timeStamp)}</td> }
    <td width="25">
      <i className="fal fa-times-square font-red-500 fa-fw delete-order" onClick={() => {
        deleteOrder(order.orderIndex);
      }}></i>
    </td>
  </tr>;
}