import { RECEIVE_AUTH, RECEIVE_ETH_CONTEXT } from "../actions/actionConstants";

import { combineReducers } from "redux";

import { defaultEthProviderStatus } from "../../utils/ethUtils";

import { orderFormDetails, acceptFormDetails } from "./orders";
import { loading, modals, notifications, elementVisibility } from "./uiState";
import { activeWaterAccount, licence } from "./waterLicences";
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

const rootReducer = combineReducers({
  orderFormDetails,
  acceptFormDetails,
  ethContext,
  loading,
  modals,
  notifications,
  activeWaterAccount,
  licence,
  auth,
  accountProgress,
  elementVisibility,
});

export default rootReducer;
