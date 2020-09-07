import {
  FETCH_BUY_ORDERS,
  RECEIVE_BUY_ORDERS,
  FETCH_SELL_ORDERS,
  RECEIVE_SELL_ORDERS,
  FETCH_TRADES,
  RECEIVE_TRADES,
  MODAL_ORDER_FORM_SET,
  MODAL_ACCEPT_ORDER_SET,
  FETCH_WATER_ACCOUNTS,
  RECEIVE_WATER_ACCOUNTS,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from "../actions/actionConstants";

import initialState from "./initialState";

export const loading = (state = initialState.loading, action) => {
  switch (action.type) {
    case FETCH_BUY_ORDERS:
      return { ...state, buy: true };
    case RECEIVE_BUY_ORDERS:
      return { ...state, buy: false };
    case FETCH_SELL_ORDERS:
      return { ...state, sell: true };
    case RECEIVE_SELL_ORDERS:
      return { ...state, sell: false };
    case FETCH_TRADES:
      return { ...state, trades: true };
    case RECEIVE_TRADES:
      return { ...state, trades: false };
    case FETCH_WATER_ACCOUNTS:
      return { ...state, waterLicences: true };
    case RECEIVE_WATER_ACCOUNTS:
      return { ...state };
    default:
      return state;
  }
};

export const modals = (state = { ...initialState.modals }, action) => {
  switch (action.type) {
    case MODAL_ORDER_FORM_SET:
      return { ...state, orderForm: action.value };
    case MODAL_ACCEPT_ORDER_SET:
      return { ...state, acceptOrder: action.value };
    default:
      return state;
  }
};

export const notifications = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload];
    case REMOVE_NOTIFICATION:
      return [...state.filter(({ id }) => id !== action.value)];
    default:
      return state;
  }
};

const defaultVisibility = {
  showButtons: false,
  showAccountBanner: false,
};

export const elementVisibility = (state = { ...defaultVisibility }, action) => {
  switch (action.type) {
    case "SET_SHOW_BUTTONS":
      return { ...state, showButtons: action.value };
    case "SET_SHOW_ACCOUNT_BANNER":
      return { ...state, showAccountBanner: action.value };
    default:
      return { ...state };
  }
};
