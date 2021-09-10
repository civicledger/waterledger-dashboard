import React from "react";
import { useQuery } from "react-query";

import Order from "./Order";

import OrderButton from "../dashboard/OrderButton";
import { getOrders } from "../queries";

export default props => {
  const { type, isPending, licenceId = null, showType = false, showTimestamp = false, waterAccounts = [], button } = props;
  const columns = 3 + +showTimestamp + +showType;

  const { data: orders, isLoading } = useQuery(["getOrders", type], () => getOrders(type, licenceId), { keepPreviousData: true });

  if (!orders && isLoading) return "";

  return (
    <>
      <table className="w-full order-list">
        <thead>
          <tr className="text-left bg-steel-700">
            {showType && <th className="p-4 py-3">Type</th>}
            <th className="p-4 py-3">Price / ML</th>
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
            return <Order order={order} key={index} highlightRow={true} type={type} isPending={isPending} waterAccounts={waterAccounts} />;
          })}
        </tbody>
      </table>

      {button && <OrderButton type={type} isPending={isPending} />}
    </>
  );
};
