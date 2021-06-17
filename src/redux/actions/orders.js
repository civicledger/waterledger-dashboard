import { CONFIRM_ORDER, SELECT_ORDER_TYPE, SET_ORDER_FORM_VALUES, SET_ACCEPT_FORM_VALUES } from "./actionConstants";

import { addNotification, setOrderFormModal, setAcceptOrderModal } from "./actions";

import { errorMessage } from "../../utils/format";

import { orderService } from "../../services/OrderService";
import { acceptanceService } from "../../services/AcceptanceService";

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

export const submitOrder = order => {
  return dispatch => {
    orderService
      .create(order)
      .then(response => {
        dispatch(
          addNotification({
            id: `confirmed-${response.id}`,
            type: "success",
            text: `Your ${order.type} order has been confirmed`,
          })
        );
      })
      .catch("error", function (error) {
        dispatch(
          addNotification({
            type: "error",
            text: errorMessage(error),
          })
        );
      });
  };
};

export const acceptOrder = order => {
  return dispatch => {
    acceptanceService.create(order).then(response => {
      dispatch(
        addNotification({
          id: `confirmed-${response.id}`,
          type: "success",
          text: `Your trade has been approved`,
        })
      );
    });
  };
};

export const deleteOrder = id => {
  return dispatch => {
    dispatch(
      addNotification({
        text: "Deletion of orders is not currently supported",
      })
    );
    // orderService.deleteOrder(id).then(rawTransaction => {
    //   web3.eth
    //     .sendSignedTransaction(rawTransaction)
    //     .on("transactionHash", hash => {
    //       dispatch(
    //         addNotification({
    //           id: `added-${hash}`,
    //           text: "Order is being removed",
    //         })
    //       );
    //       orderService.awaitConfirmationForHash(hash).then(() => {
    //         dispatch(
    //           addNotification({
    //             id: `confirmed-${hash}`,
    //             type: "success",
    //             text: "Your order has been removed",
    //           })
    //         );
    //       });
    //     })
    //     .on("error", function (error) {
    //       dispatch(
    //         addNotification({
    //           type: "error",
    //           text: errorMessage(error),
    //         })
    //       );
    //     });
    // });
  };
};
