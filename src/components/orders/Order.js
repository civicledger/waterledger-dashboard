import React from "react";
import { useDispatch } from "react-redux";
import { openAcceptOrder } from "../../redux/actions/orders";
import { formatAmount, formatShortDateObject, formatKilolitres } from "../../utils/format";
import classNames from "classnames";

const orderTypes = { buy: "Offer", sell: "Bid" };

export default ({ order, showType = false, showTimestamp = false, highlightRow, deleteOrder, waterAccounts }) => {
  const dispatch = useDispatch();

  let { id, ethId, type, price, quantity, createdAt, zoneName, accountId } = order;

  const isOwner = waterAccounts.find(({ id }) => id === accountId);
  const isReadOnly = false;

  const classNameObject = {
    "order-row": true,
    "text-gray-500": isOwner,
    "cursor-pointer": !isOwner && highlightRow && !isReadOnly,
    "hover:bg-green-300": !isOwner && highlightRow && !isReadOnly && type === "buy",
    "hover:text-green-600": !isOwner && highlightRow && !isReadOnly && type === "buy",
    "hover:bg-red-300": !isOwner && highlightRow && !isReadOnly && type === "sell",
    "hover:text-red-600": !isOwner && highlightRow && !isReadOnly && type === "sell",
  };

  return (
    <tr
      className={classNames(classNameObject)}
      onClick={() => {
        if (!highlightRow || isReadOnly || isOwner) return;
        dispatch(openAcceptOrder({ id, ethId, type, price, quantity }));
      }}
    >
      {showType && <td className="py-2 px-1">{orderTypes[type]}</td>}
      <td className="p-2">{formatAmount(price)}</td>
      <td className="p-2">{formatKilolitres(quantity)}</td>
      <td className="p-2">{zoneName}</td>
      {showTimestamp && <td className="p-2">{formatShortDateObject(createdAt)}</td>}
      <td width="30" className="p-2 pl-0">
        {isOwner && <i className="fal fa-times-square font-red-500 fa-fw delete-order" onClick={() => dispatch(deleteOrder(id))}></i>}
      </td>
    </tr>
  );
};
