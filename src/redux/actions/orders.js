import { CONFIRM_ORDER, SELECT_ORDER_TYPE, SET_ORDER_FORM_VALUES, SET_ACCEPT_FORM_VALUES } from "./actionConstants";

import { addNotification, setOrderFormModal, setAcceptOrderModal } from "./actions";

import { web3 } from "../../utils/ethUtils";
import { errorMessage } from "../../utils/format";

import { serviceLoader } from "../../services/serviceLoader";

const orderService = serviceLoader("OrderBook");

export const confirmOrder = id => ({ type: CONFIRM_ORDER, id });
export const selectOrderType = type => ({ type: SELECT_ORDER_TYPE, selected: type });
export const setOrderFormValues = payload => ({ type: SET_ORDER_FORM_VALUES, payload });
export const setAcceptFormValues = payload => ({ type: SET_ACCEPT_FORM_VALUES, payload });

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

export const submitBuyOrder = (price, quantity, zoneIndex) => {
  return dispatch => {
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

export const submitSellOrder = (price, quantity, zoneIndex) => {
  return dispatch => {
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
