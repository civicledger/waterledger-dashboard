import React from "react";
import { useDispatch } from "react-redux";
import { openAcceptOrder, deleteOrder } from "../../redux/actions/orders";
import { formatAmount, formatShortDateObject, formatKilolitres } from "../../utils/format";
import classNames from "classnames";
import { getSavedTerminologies, queryClient } from "../queries";
import { useQuery } from "react-query";

const orderTypes = { buy: "Offer", sell: "Bid" };

export default ({ order, showType = false, showTimestamp = false, highlightRow, waterAccounts = [], type, isPending, loggedIn }) => {
  const { data: terminologies } = useQuery("getTerminologies", getSavedTerminologies);

  const dispatch = useDispatch();

  let { id, ethId, price, quantity, createdAt, account } = order;

  const isOwner = waterAccounts.find(({ id }) => id === account.id);

  const isHighlightable = !isOwner && !isPending && loggedIn && highlightRow;

  const classNameObject = {
    "order-row": true,
    "text-gray-500": isOwner,
    "cursor-pointer hover:bg-green-300 hover:text-green-600": isHighlightable && type === "buy",
    "cursor-pointer hover:bg-red-300 hover:text-red-600": isHighlightable && type === "sell",
  };

  return (
    <tr
      className={classNames(classNameObject)}
      onClick={() => {
        if (!highlightRow || isPending || isOwner || !loggedIn) return;
        dispatch(openAcceptOrder({ id, ethId, type, price, quantity }));
      }}
    >
      {showType && <td className="p-4 py-3">{orderTypes[type]}</td>}
      <td className="p-4 py-3">{formatAmount(price)}</td>
      <td className="p-4 py-3">{formatKilolitres(quantity, terminologies["unit"])}</td>
      <td className="p-4 py-3">{account.zone.shortName}</td>
      {showTimestamp && <td className="p-4 py-3">{formatShortDateObject(createdAt)}</td>}
      <td width="30" className="py-3">
        {isOwner && (
          <div
            role="button"
            onClick={e => {
              e.stopPropagation();
              dispatch(deleteOrder(id));
              setTimeout(() => {
                queryClient.invalidateQueries(["getOrders"]);
              }, 3000);
            }}
          >
            <i className="fal fa-times-square font-red-500 fa-fw delete-order"></i>
          </div>
        )}
      </td>
    </tr>
  );
};
