import React from 'react';
import Order from './Order';

const OrderList = props => {
  const {orders, showType=false, showTimestamp=false, showPeriod = false} = props;
  let firstValid = false;
  let firstValidSent = false;
  return <table className="w-full order-list">
    <thead>
      <tr className="text-left">
        { showType && <th className="p-2 pb-0">Type</th> }
        <th className="p-2 pb-0">Price</th>
        <th className="p-2 pb-0">Volume</th>
        <th className="p-2 pb-0">Zone</th>
        { showPeriod && <th className="p-2 pb-0">Period</th> }
        { showTimestamp && <th className="p-2 pb-0">Mined</th> }
        <th></th>
      </tr>
    </thead>
    <tbody>
    {orders.map((order, index) => {
      if (!firstValidSent && order.owner !== props.ethContext.address) {
        firstValidSent = true;
        firstValid = index;
      }
      return <Order order={order} key={index} index={index} highlightRow={firstValid === index} {...props} />;
    })}
    </tbody>
  </table>;
}

export default OrderList;