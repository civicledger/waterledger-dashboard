import { RECEIVE_AUTH, RECEIVE_ETH_CONTEXT, RECEIVE_LICENCES, RECEIVE_ADMIN_LICENCES, SET_ACTIVE_LICENCE } from "../actions/actionConstants";

import { combineReducers } from "redux";

import { defaultEthProviderStatus } from "../../utils/ethUtils";

import { buys, sells, trades, orderFormDetails, acceptFormDetails } from "./orders";
import { loading, modals, notifications, elementVisibility } from "./uiState";
import { waterAccounts, activeWaterAccount, licence } from "./waterLicences";
import { accountProgress } from "./progress";

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
  acceptFormDetails,
  ethContext,
  loading,
  modals,
  trades,
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
