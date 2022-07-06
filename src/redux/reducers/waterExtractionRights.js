import { SET_ACTIVE_WATER_ACCOUNT, RECEIVE_EXTRACTION_RIGHT } from "../actions/actionConstants";

export const extractionRight = (state = localStorage.getItem("wl-extractionRight") || null, action) => {
  switch (action.type) {
    case RECEIVE_EXTRACTION_RIGHT:
      return action.value;
    default:
      return state;
  }
};

export const activeWaterAccount = (state = localStorage.getItem("wl-waterAccount"), action) => {
  switch (action.type) {
    case SET_ACTIVE_WATER_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
};
