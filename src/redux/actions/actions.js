import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, MODAL_ACCEPT_ORDER_SET, MODAL_ORDER_FORM_SET } from "./actionConstants";

export const createNotification = payload => ({ type: ADD_NOTIFICATION, payload });
export const removeNotification = value => ({ type: REMOVE_NOTIFICATION, value });

export const setOrderFormModal = (value = true) => ({ type: MODAL_ORDER_FORM_SET, value });
export const setAcceptOrderModal = (value = true) => ({ type: MODAL_ACCEPT_ORDER_SET, value });

export const elementVisibilityShowButtons = value => ({
  type: "SET_SHOW_BUTTONS",
  value,
});
export const elementVisibilityShowAccountBanner = value => ({
  type: "SET_SHOW_ACCOUNT_BANNER",
  value,
});

export const addNotification = payload => {
  payload = { id: Date.now(), type: "info", ...payload };
  return dispatch => {
    dispatch(createNotification(payload));
    setTimeout(() => {
      dispatch(removeNotification(payload.id));
    }, 10000);
  };
};
