import React from 'react';
import Order from './Order';

const OrderList = props => {
  const {orders, showType=false, showTimestamp=false, showPeriod = false} = props;
  let firstValid = false;
  let firstValidSent = false;
  return <table className="w-full order-list">
    <thead>
      <tr className="text-left">
        { showType && <th className="pb-1">Type</th> }
        <th className="pb-1">Price</th>
        <th className="pb-1">Volume</th>
        <th className="pb-1">Zone</th>
        { showPeriod && <th className="pb-1">Period</th> }
        { showTimestamp && <th className="pb-1">Mined</th> }
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