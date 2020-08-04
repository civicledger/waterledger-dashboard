import React from "react";
import Order from "./Order";

const OrderList = props => {
  const { orders, showType = false, showTimestamp = false } = props;
  let firstValid = false;
  let firstValidSent = false;
  const columns = 3 + +showTimestamp + +showType;

  return (
    <table className="w-full order-list">
      <thead>
        <tr className="text-left bg-steel-700">
          {showType && <th className="p-2 pb-0">Type</th>}
          <th className="p-2">Price</th>
          <th className="p-2">Volume</th>
          <th className="p-2">Zone</th>
          {showTimestamp && <th className="p-2">Mined</th>}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 && (
          <tr>
            <td colSpan={columns} className="text-center p-5 pt-10">
              No Orders Currently Available
            </td>
          </tr>
        )}
        {orders.map((order, index) => {
          if (!firstValidSent && order.owner !== props.ethContext.address) {
            firstValidSent = true;
            firstValid = index;
          }
          return <Order order={order} key={index} index={index} highlightRow={firstValid === index} {...props} />;
        })}
      </tbody>
    </table>
  );
};

export default OrderList;
