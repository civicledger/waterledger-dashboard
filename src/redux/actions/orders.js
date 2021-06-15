import { CONFIRM_ORDER, SELECT_ORDER_TYPE, SET_ORDER_FORM_VALUES, SET_ACCEPT_FORM_VALUES } from "./actionConstants";
import { addNotification, setOrderFormModal, setAcceptOrderModal } from "./actions";
import { errorMessage } from "../../utils/format";
import { orderService } from "../../services/OrderService";

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

export const acceptOrder = (id, zone) => {
  return dispatch => {
    orderService.acceptOrder(id, zone).then(rawTransaction => {
      // web3.eth
      //   .sendSignedTransaction(rawTransaction)
      //   .on("transactionHash", hash => {
      //     dispatch(addNotification({ id: `accepted-${hash}`, text: "Order has been accepted" }));
      //   })
      //   .on("error", function (error) {
      //     dispatch(addNotification({ type: "error", text: errorMessage(error) }));
      //   });
    });
  };
};

export const deleteOrder = id => {
  return dispatch => {
    orderService
      .delete(id)
      .then(transaction => {
        dispatch(
          addNotification({
            id: `added-${transaction.data.receipt.hash}`,
            type: "success",
            text: "Order is being removed",
          })
        );
      })
      .catch(error => {
        dispatch(
          addNotification({
            type: "error",
            text: errorMessage(error),
          })
        );
      });
  };
};
