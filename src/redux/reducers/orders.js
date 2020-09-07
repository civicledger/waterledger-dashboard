import {
  ADD_BUY_ORDER,
  ADD_SELL_ORDER,
  SELECT_ORDER_TYPE,
  SET_ORDER_FORM_VALUES,
  SET_ACCEPT_FORM_VALUES,
  RECEIVE_BUY_ORDERS,
  RECEIVE_SELL_ORDERS,
  RECEIVE_TRADES,
} from "../actions/actionConstants";

import initialState from "./initialState";

export const orderType = (state = initialState.orderType, action) => {
  switch (action.type) {
    case SELECT_ORDER_TYPE:
      return action.selected;
    default:
      return state;
  }
};

export const orderFormDetails = (state = initialState.orderFormDetails, action) => {
  switch (action.type) {
    case SELECT_ORDER_TYPE:
      return { ...state, type: action.selected };
    case SET_ORDER_FORM_VALUES:
      return { ...action.payload };
    default:
      return { ...state };
  }
};

export const acceptFormDetails = (state = initialState.acceptFormDetails, action) => {
  switch (action.type) {
    case SET_ACCEPT_FORM_VALUES:
      return { ...action.payload };
    default:
      return { ...state };
  }
};

export const buys = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BUY_ORDERS:
      return action.payload;
    case ADD_BUY_ORDER:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const trades = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_TRADES:
      return action.payload;
    default:
      return state;
  }
};

export const sells = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SELL_ORDERS:
      return action.payload;
    case ADD_SELL_ORDER:
      return [...state, action.payload];
    default:
      return state;
  }
};
