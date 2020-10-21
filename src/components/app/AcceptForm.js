import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { formatAmount, formatKilolitres, formatEthereumAddress } from "../../utils/format";
import { getOrders } from "../queries";
import { acceptOrder } from "../../redux/actions/orders";
import { setAcceptOrderModal } from "../../redux/actions/actions";

const zones = [
  "Barron A - Barron Catchment",
  "Barron B - Tinaroo Dam",
  "Barron C - Lake Tinaroo Ponded Area",
  "Barron D - Lake Tinaroo Ponded Area",
  "Barron E - Walsh & Mitchell Catchments",
];

export default props => {
  const dispatch = useDispatch();
  const acceptFormDetails = useSelector(state => state.acceptFormDetails);
  let activeWaterAccount = useSelector(state => state.activeWaterAccount);
  const waterAccounts = useSelector(state => state.waterAccounts);

  activeWaterAccount = waterAccounts.find(wa => wa.waterAccountId === activeWaterAccount);

  const { data: buys, isLoading: buysLoading } = useQuery(["getOrders", "buy"], getOrders);
  const { data: sells, isLoading: sellsLoading } = useQuery(["getOrders", "sell"], getOrders);

  if (buysLoading || sellsLoading) return "";

  const orders = [...buys, ...sells];
  if (orders === undefined || orders.length === 0) return "";

  const order = orders.find(o => o.id === acceptFormDetails.id);

  if (!order) return "";
  return (
    <div>
      <form className="" onSubmit={event => event.preventDefault()}>
        <div>
          <p>Do you wish to accept this {acceptFormDetails.type === "sell" ? "bid" : "offer"}?</p>

          <div className="w-3/4 mx-auto text-steel-800 bg-steel-100 border border-steel-800 rounded p-3 mt-5 mb-10">
            <h3 className="text-lg">Order Details</h3>
            <div className="flex mt-2">
              <div className="w-1/4">ID</div>
              <div className="w-3/4">{formatEthereumAddress(order.ethId)}</div>
            </div>

            <div className="flex mt-1">
              <div className="w-1/4">Type</div>
              <div className="w-3/4">{order.orderType === 1 ? "Bid" : "Offer"}</div>
            </div>

            <div className="flex mt-1">
              <div className="w-1/4">Price</div>
              <div className="w-3/4">{formatAmount(order.price)}</div>
            </div>

            <div className="flex mt-1">
              <div className="w-1/4">Quantity</div>
              <div className="w-3/4">{formatKilolitres(order.quantity)}</div>
            </div>

            <div className="flex mt-3">
              <div className="w-1/4">Order Zone</div>
              <div className="w-3/4">{order.zoneNameLong}</div>
            </div>

            <div className="flex mt-1">
              <div className="w-1/4">Your Zone</div>
              <div className="w-3/4">{zones[activeWaterAccount.zoneIndex]}</div>
            </div>

            <div className="flex mt-1">
              <div className="w-1/4">Interzone</div>
              <div className="w-3/4">{zones[activeWaterAccount.zoneIndex] === order.zoneNameLong ? "No" : "Yes"}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="text-steel-100 py-2 px-3 bg-red-500 rounded-sm" onClick={props.handleClose}>
            <i className="fal fa-times mr-1"></i> Close
          </button>
          <button
            className="bg-sorange text-steel-100 p-2 px-3 rounded-sm"
            onClick={() => {
              dispatch(acceptOrder(acceptFormDetails.ethId, activeWaterAccount.zoneIndex));
              dispatch(setAcceptOrderModal(false));
            }}
          >
            <i className="fal fa-check-circle mr-1"></i> Accept Order
          </button>
        </div>
      </form>
    </div>
  );
};
