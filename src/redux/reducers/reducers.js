import {
  RECEIVE_AUTH,
  RECEIVE_LAST_TRADE_PRICE,
  RECEIVE_ETH_CONTEXT,
  RECEIVE_LICENCES,
  RECEIVE_ADMIN_LICENCES,
  SET_ACTIVE_LICENCE,
  RECEIVE_SCHEME_NAME,
} from "../actions/actionConstants";

import { combineReducers } from "redux";

import { defaultEthProviderStatus } from "../../utils/ethUtils";

import { buys, sells, trades, orderFormDetails } from "./orders";
import { loading, modals, notifications, elementVisibility } from "./uiState";
import { waterAccounts, activeWaterAccount, licence } from "./waterLicences";
import { accountProgress } from "./progress";

export const scheme = (state = { schemeName: "", lastTradePrice: 0, address: null }, action) => {
  switch (action.type) {
    case RECEIVE_LAST_TRADE_PRICE:
      return { ...state, lastTradePrice: action.payload };
    case RECEIVE_SCHEME_NAME:
      return { ...state, schemeName: action.payload };
    case "RECEIVE_SCHEME_ADDRESS":
      return { ...state, address: action.address };
    default:
      return { ...state };
  }
};

export const ethContext = (state = defaultEthProviderStatus, action) => {
  switch (action.type) {
    case RECEIVE_ETH_CONTEXT:
      return { ...action.payload };
    default:
      return state;
  }
};

export const auth = (state = false, action) => {
  switch (action.type) {
    case RECEIVE_AUTH:
      return action.value;
    default:
      return state;
  }
};

export const licences = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_LICENCES:
      return action.payload;
    default:
      return state;
  }
};

export const adminLicences = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ADMIN_LICENCES:
      return action.payload;
    default:
      return state;
  }
};

export const activeLicence = (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_LICENCE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  buys,
  sells,
  orderFormDetails,
  ethContext,
  loading,
  modals,
  trades,
  scheme,
  notifications,
  activeWaterAccount,
  waterAccounts,
  adminLicences,
  licence,
  auth,
  activeLicence,
  accountProgress,
  elementVisibility,
});

export default rootReducer;
