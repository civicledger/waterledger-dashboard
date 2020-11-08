import React, { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { titleCase, formatKilolitres } from "../../utils/format";
import { getLicence } from "../queries";

export default props => {
  const activeWaterAccount = useSelector(state => state.activeWaterAccount);
  const orderFormDetails = useSelector(state => state.orderFormDetails);

  const { type } = orderFormDetails;

  const [price, setPrice] = useState(orderFormDetails.price || "");
  const [quantity, setQuantity] = useState(orderFormDetails.quantity || "");

  const { data: licence } = useQuery("getLicence", getLicence, { keepPreviousData: true });
  if (!licence) return "";

  const isSell = type === "sell";
  const waterAccount = licence.accounts.find(wa => wa.waterAccount === activeWaterAccount);

  const excessVolumeError = isSell && quantity > waterAccount.balance;

  const isReadOnly = !quantity || !price || excessVolumeError;

  let bgColor = isReadOnly ? "gray" : isSell ? "red" : "green";

  return (
    <Fragment>
      <div className="hidden lg:block p-3 rounded bg-steel-400 my-3">
        <h4 className="mb-2 font-semibold">Currently Trading As</h4>
        <div className="flex text-steel-100 text-center">
          <div className="flex-1 text-left">{waterAccount.waterAccount}</div>
          <div className="flex-2">{waterAccount.zone.longName}</div>
          <div className="flex-1 text-right">{formatKilolitres(waterAccount.balance)}</div>
        </div>
      </div>

      <label className="text-steel-900">Volume (ML)</label>
      <input
        type="text"
        value={quantity}
        onChange={({ target }) => setQuantity(target.value)}
        className="input text-steel-900 rounded"
        name="quantity"
      />

      {excessVolumeError && <div className="text-sm text-red-100 mb-3">You do not have suffient allocation to make this offer</div>}

      <label className="text-steel-900">Price ($/ML)</label>
      <input type="text" value={price} onChange={({ target }) => setPrice(target.value)} className="input text-steel-900 rounded" name="price" />

      <button
        type="submit"
        className={`btn-${bgColor} w-full`}
        onClick={() => {
          props.placeOrder({ price, quantity, type, zoneIndex: waterAccount.zone.zoneIndex });
          setPrice("");
          setQuantity("");
        }}
        disabled={isReadOnly}
      >
        Place {titleCase(type)} Order
      </button>
    </Fragment>
  );
};
