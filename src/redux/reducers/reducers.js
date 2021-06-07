import { RECEIVE_AUTH } from "../actions/actionConstants";

import { combineReducers } from "redux";

import { orderFormDetails, acceptFormDetails } from "./orders";
import { loading, modals, notifications, elementVisibility } from "./uiState";
import { activeWaterAccount, licence } from "./waterLicences";

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
  loading,
  modals,
  notifications,
  activeWaterAccount,
  licence,
  auth,
  elementVisibility,
});

export default rootReducer;
