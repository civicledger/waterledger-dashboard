import React, { useContext } from "react";

import Order from "./Order";

import OrderButton from "../dashboard/OrderButton";
import { TerminologyContext } from "../contexts";

export default props => {
  const { terminologies } = useContext(TerminologyContext);
  const { type, orders = [], isPending, showType = false, showTimestamp = false, button } = props;
  const columns = 3 + +showTimestamp + +showType;

  if (!orders) return "";

  return (
    <>
      <table className="w-full order-list">
        <thead>
          <tr className="text-left bg-steel-700">
            {showType && <th className="p-4 py-3">Type</th>}
            <th className="p-4 py-3">Price / {terminologies["unit"]}</th>
            <th className="p-4 py-3">Volume</th>
            <th className="p-4 py-3">Zone</th>
            {showTimestamp && <th className="p-4 py-3">Mined</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan={columns} className="text-center p-4 py-3">
                No Orders Currently Available
              </td>
            </tr>
          )}
          {orders.map((order, index) => {
            return <Order order={order} key={index} highlightRow={true} {...props} />;
          })}
        </tbody>
      </table>

      {button && <OrderButton type={type} isPending={isPending} />}
    </>
  );
};
