import React from "react";
import { useDispatch } from "react-redux";
import { openAcceptOrder, deleteOrder } from "../../redux/actions/orders";
import { formatAmount, formatShortDateObject, formatKilolitres } from "../../utils/format";
import classNames from "classnames";

const orderTypes = { buy: "Offer", sell: "Bid" };

export default ({ order, showType = false, showTimestamp = false, highlightRow, waterAccounts = [], type, isPending }) => {
  const dispatch = useDispatch();

  let { id, ethId, price, quantity, createdAt, zoneName, accountId } = order;

  const isOwner = waterAccounts.find(({ id }) => id === accountId);

  const classNameObject = {
    "order-row": true,
    "text-gray-500": isOwner,
    "cursor-pointer": !isOwner && highlightRow && !isPending,
    "hover:bg-green-300": !isOwner && highlightRow && !isPending && type === "buy",
    "hover:text-green-600": !isOwner && highlightRow && !isPending && type === "buy",
    "hover:bg-red-300": !isOwner && highlightRow && !isPending && type === "sell",
    "hover:text-red-600": !isOwner && highlightRow && !isPending && type === "sell",
  };

  return (
    <tr
      className={classNames(classNameObject)}
      onClick={() => {
        if (!highlightRow || isPending || isOwner) return;
        dispatch(openAcceptOrder({ id, ethId, type, price, quantity }));
      }}
    >
      {showType && <td className="p-4 py-3">{orderTypes[type]}</td>}
      <td className="p-4 py-3">{formatAmount(price)}</td>
      <td className="p-4 py-3">{formatKilolitres(quantity)}</td>
      <td className="p-4 py-3">{zoneName}</td>
      {showTimestamp && <td className="p-4 py-3">{formatShortDateObject(createdAt)}</td>}
      <td width="30" className="p-4 py-3">
        {isOwner && <i className="fal fa-times-square font-red-500 fa-fw delete-order" onClick={() => dispatch(deleteOrder(id))}></i>}
      </td>
    </tr>
  );
};
