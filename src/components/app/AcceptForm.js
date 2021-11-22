import React, { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { formatAmount, formatKilolitres, formatEthereumAddress } from "../../utils/format";
import { getOrders, getLicence, getSavedTerminologies } from "../queries";
import { UserContext } from "../contexts";
import { acceptOrder } from "../../redux/actions/orders";
import { setAcceptOrderModal } from "../../redux/actions/actions";

export default props => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const acceptFormDetails = useSelector(state => state.acceptFormDetails);
  const {
    login: { activeWaterAccount, licenceId },
  } = useContext(UserContext);

  const { data: terminologies } = useQuery("getTerminologies", getSavedTerminologies);

  if (!activeWaterAccount) return "";
  const { data: licence } = useQuery(["getLicence", licenceId], () => getLicence(licenceId), { keepPreviousData: true });
  const { data: buys, isLoading: buysLoading } = useQuery(["getOrders", "buy"], () => getOrders("buy"));
  const { data: sells, isLoading: sellsLoading } = useQuery(["getOrders", "sell"], () => getOrders("sell"));

  if (!licence) return "";

  if (buysLoading || sellsLoading) return "";

  const activeAccount = licence.accounts.find(account => account.id === activeWaterAccount);

  const orders = [...buys, ...sells];
  if (orders === undefined || orders.length === 0) return "";

  const order = orders.find(o => o.id === acceptFormDetails.id);

  if (!order) return "";
  return (
    <div>
      <form className="" onSubmit={event => event.preventDefault()}>
        <div>
          <p>Do you wish to accept this {acceptFormDetails.type === "sell" ? "offer" : "bid"}?</p>

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
              <div className="w-1/4 capitalize">Order {terminologies["zone"]}</div>
              <div className="w-3/4">{order.zoneNameLong}</div>
            </div>

            <div className="flex mt-1">
              <div className="w-1/4 capitalize">Your {terminologies["zone"]}</div>
              <div className="w-3/4">{activeAccount.zone.longName}</div>
            </div>

            <div className="flex mt-1">
              <div className="w-1/4">Inter{terminologies["zone"]}</div>
              <div className="w-3/4">{activeAccount.zone.longName === order.zoneNameLong ? "No" : "Yes"}</div>
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
              dispatch(acceptOrder({ orderId: order.id, waterAccountId: activeAccount.id }));
              dispatch(setAcceptOrderModal(false));
              setTimeout(() => {
                queryClient.invalidateQueries(["getScheme"]);
              }, 3000);
            }}
          >
            <i className="fal fa-check-circle mr-1"></i> Accept Order
          </button>
        </div>
      </form>
    </div>
  );
};
