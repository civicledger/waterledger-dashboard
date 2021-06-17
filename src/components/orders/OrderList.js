import React from "react";
import Order from "./Order";

export default props => {
  const { orders, showType = false, showTimestamp = false, isLoading = false } = props;
  const columns = 3 + +showTimestamp + +showType;

  if (orders === undefined && isLoading) return <div>loading</div>;

  return (
    <table className="w-full order-list">
      <thead>
        <tr className="text-left bg-steel-700">
          {showType && <th className="p-2 pb-0">Type</th>}
          <th className="p-2">Price / ML</th>
          <th className="p-2">Volume</th>
          <th className="p-2">Zone</th>
          {showTimestamp && <th className="p-2">Mined</th>}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 && (
          <tr>
            <td colSpan={columns} className="text-center p-5">
              No Orders Currently Available
            </td>
          </tr>
        )}
        {orders.map((order, index) => {
          return <Order order={order} key={index} highlightRow={true} {...props} />;
        })}
      </tbody>
    </table>
  );
};
