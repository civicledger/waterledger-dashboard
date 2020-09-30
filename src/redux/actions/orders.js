import {
  CONFIRM_ORDER,
  FETCH_BUY_ORDERS,
  FETCH_SELL_ORDERS,
  FETCH_TRADES,
  RECEIVE_BUY_ORDERS,
  RECEIVE_SELL_ORDERS,
  SELECT_ORDER_TYPE,
  SET_ORDER_FORM_VALUES,
  SET_ACCEPT_FORM_VALUES,
  RECEIVE_TRADES,
} from "./actionConstants";

import { addNotification, setOrderFormModal, setAcceptOrderModal } from "./actions";
import { fetchZoneBalance } from "./waterLicences";

import { web3 } from "../../utils/ethUtils";
import { errorMessage } from "../../utils/format";

import { serviceLoader } from "../../services/serviceLoader";

const orderService = serviceLoader("OrderBook");
const orderHistoryService = serviceLoader("OrderHistory");

export const confirmOrder = id => ({ type: CONFIRM_ORDER, id });
export const selectOrderType = type => ({ type: SELECT_ORDER_TYPE, selected: type });
export const setOrderFormValues = payload => ({ type: SET_ORDER_FORM_VALUES, payload });
export const setAcceptFormValues = payload => ({ type: SET_ACCEPT_FORM_VALUES, payload });

export const receiveBuyOrders = payload => ({ type: RECEIVE_BUY_ORDERS, payload });
export const receiveSellOrders = payload => ({ type: RECEIVE_SELL_ORDERS, payload });
export const receiveTrades = payload => ({ type: RECEIVE_TRADES, payload });

export const startFetchBuyOrders = () => ({ type: FETCH_BUY_ORDERS });
export const startFetchSellOrders = () => ({ type: FETCH_SELL_ORDERS });
export const startFetchTrades = () => ({ type: FETCH_TRADES });

export const openOrderForm = orderForm => {
  return dispatch => {
    dispatch(selectOrderType(orderForm.type));
    dispatch(setOrderFormValues(orderForm));
    dispatch(setOrderFormModal());
  };
};

export const openAcceptOrder = acceptForm => {
  return dispatch => {
    dispatch(setAcceptFormValues(acceptForm));
    dispatch(setAcceptOrderModal());
  };
};

export function fetchBuyOrders(number = 10) {
  return dispatch => {
    dispatch(startFetchBuyOrders());
    return orderService.getOrders("buy").then(
      response => dispatch(receiveBuyOrders(response)),
      error => {
        console.log(error);
        dispatch(
          addNotification({
            type: "error",
            text: "No smart contract connection found",
          })
        );
      }
    );
  };
}

export function fetchSellOrders(number = 10) {
  return dispatch => {
    dispatch(startFetchSellOrders());
    return orderService
      .getOrders("sell")
      .then(response => dispatch(receiveSellOrders(response)))
      .catch(error => {});
  };
}

export function fetchTrades(number = 10) {
  return dispatch => {
    return orderHistoryService
      .getHistory(number)
      .then(response => dispatch(receiveTrades(response)))
      .catch(error => {});
  };
}

export const submitBuyOrder = (price, quantity) => {
  return (dispatch, getState) => {
    const { activeWaterAccount, waterAccounts } = getState();
    const { zoneIndex } = waterAccounts.find(l => activeWaterAccount === l.waterAccountId);

    orderService.addBuyOrder(price, quantity, zoneIndex).then(rawTransaction => {
      web3.eth
        .sendSignedTransaction(rawTransaction)
        .on("transactionHash", hash => {
          dispatch(
            addNotification({
              id: `added-${hash}`,
              text: "Your buy order is being added",
            })
          );
          orderService.awaitConfirmationForHash(hash).then(receipt => {
            dispatch(
              addNotification({
                id: `confirmed-${hash}`,
                type: "success",
                text: "Your buy order has been confirmed",
              })
            );
            dispatch(fetchBuyOrders());
          });
        })
        .on("error", function (error) {
          dispatch(
            addNotification({
              type: "error",
              text: errorMessage(error),
            })
          );
        });
    });
  };
};

export const acceptOrder = (id, zone) => {
  return dispatch => {
    orderService.acceptOrder(id, zone).then(rawTransaction => {
      web3.eth
        .sendSignedTransaction(rawTransaction)
        .on("transactionHash", hash => {
          dispatch(addNotification({ id: `accepted-${hash}`, text: "Order has been accepted" }));
          dispatch(fetchBuyOrders());
          dispatch(fetchSellOrders());
          dispatch(fetchTrades());
        })
        .on("error", function (error) {
          dispatch(addNotification({ type: "error", text: errorMessage(error) }));
        });
    });
  };
};

export const deleteOrder = id => {
  return dispatch => {
    orderService.deleteOrder(id).then(rawTransaction => {
      web3.eth
        .sendSignedTransaction(rawTransaction)
        .on("transactionHash", hash => {
          dispatch(
            addNotification({
              id: `added-${hash}`,
              text: "Order is being removed",
            })
          );
          orderService.awaitConfirmationForHash(hash).then(() => {
            dispatch(
              addNotification({
                id: `confirmed-${hash}`,
                type: "success",
                text: "Your order has been removed",
              })
            );
            dispatch(fetchBuyOrders());
          });
        })
        .on("error", function (error) {
          dispatch(
            addNotification({
              type: "error",
              text: errorMessage(error),
            })
          );
        });
    });
  };
};

export const submitSellOrder = (price, quantity) => {
  return (dispatch, getState) => {
    const { activeWaterAccount, waterAccounts, ethContext } = getState();

    const { zoneIndex } = waterAccounts.find(l => activeWaterAccount === l.waterAccountId);

    orderService.addSellOrder(price, quantity, zoneIndex).then(rawTransaction => {
      web3.eth
        .sendSignedTransaction(rawTransaction)
        .on("transactionHash", hash => {
          dispatch(
            addNotification({
              id: `added-${hash}`,
              text: "Your sell order is being added",
            })
          );

          orderService.awaitConfirmationForHash(hash).then(receipt => {
            dispatch(
              addNotification({
                id: `confirmed-${hash}`,
                type: "success",
                text: "Your sell order has been confirmed",
              })
            );

            dispatch(fetchSellOrders());
            dispatch(fetchSellOrders());
            dispatch(fetchZoneBalance(ethContext.address, zoneIndex));
          });
        })
        .on("error", error => {
          dispatch(
            addNotification({
              type: "error",
              text: errorMessage(error),
            })
          );
        });
    });
  };
};
