import React from "react";
import { useDispatch } from "react-redux";
import { openAcceptOrder } from "../../redux/actions/orders";
import { formatAmount, formatRelativeDate, formatKilolitres } from "../../utils/format";
import classNames from "classnames";

const orderTypes = ["Offer", "Bid"];
const orderTypesInternal = ["sell", "buy"];

export default ({ order, showType = false, showTimestamp = false, ethContext: { address, isReadOnly }, highlightRow, deleteOrder }) => {
  const dispatch = useDispatch();
  let { id, ethId, orderType: type, price, quantity, timeStamp, zoneName } = order;

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
        dispatch(openAcceptOrder({ id, ethId, type: matchingType, price, quantity }));
      }}
    >
      {showType && <td className="py-2 px-1">{orderTypes[type]}</td>}
      <td className="p-2">{formatAmount(price)}</td>
      <td className="p-2">{formatKilolitres(quantity)}</td>
      <td className="p-2">{zoneName}</td>
      {showTimestamp && <td className="p-2">{formatRelativeDate(timeStamp)}</td>}
      <td width="30" className="p-2 pl-0">
        {isOwner && (
          <i
            className="fal fa-times-square font-red-500 fa-fw delete-order"
            onClick={() => {
              dispatch(deleteOrder(id));
            }}
          ></i>
        )}
      </td>
    </tr>
  );
};
