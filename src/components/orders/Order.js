import React from "react";
import { formatAmount, formatRelativeDate, formatNumber } from "../../utils/format";
import classNames from "classnames";

const orderTypes = ["Offer", "Bid"];
const orderTypesInternal = ["sell", "buy"];

const zones = [
  "Barron A - Barron Catchment",
  "Barron B - Tinaroo Dam",
  "Barron C - Lake Tinaroo Ponded Area",
  "Barron D - Lake Tinaroo Ponded Area",
  "Barron E - Walsh & Mitchell Catchments",
];
export default ({
  order,
  showType = false,
  showTimestamp = false,
  ethContext: { address, isReadOnly },
  highlightRow,
  openOrderForm,
  deleteOrder,
}) => {
  let { orderType: type, price, quantity, timeStamp } = order;

  const typeInternal = orderTypesInternal[type];
  const matchingType = typeInternal === "buy" ? "sell" : "buy";

  const isOwner = address === order.owner;

  const classNameObject = {
    "order-row": true,
    "text-gray-500": isOwner,
    "cursor-pointer": highlightRow && !isReadOnly,
    "hover:bg-green-300": highlightRow && !isReadOnly && typeInternal === "buy",
    "hover:text-green-600": highlightRow && !isReadOnly && typeInternal === "buy",
    "hover:bg-red-300": highlightRow && !isReadOnly && typeInternal === "sell",
    "hover:text-red-600": highlightRow && !isReadOnly && typeInternal === "sell",
  };

  return (
    <tr
      className={classNames(classNameObject)}
      onClick={() => {
        if (!highlightRow || isReadOnly) return;
        openOrderForm({ type: matchingType, price, quantity });
      }}
    >
      {showType && <td className="py-2 px-1">{orderTypes[type]}</td>}
      <td className="p-2">{formatAmount(price)}</td>
      <td className="p-2">{formatNumber(quantity)} ML</td>
      <td className="p-2">{zones[order.zone]}</td>
      {showTimestamp && <td className="p-2">{formatRelativeDate(timeStamp)}</td>}
      <td width="30" className="p-2 pl-0">
        {isOwner && (
          <i
            className="fal fa-times-square font-red-500 fa-fw delete-order"
            onClick={() => {
              deleteOrder(order.orderIndex);
            }}
          ></i>
        )}
      </td>
    </tr>
  );
};
