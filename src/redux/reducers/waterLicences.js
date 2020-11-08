import { SET_ACTIVE_WATER_ACCOUNT, RECEIVE_LICENCE } from "../actions/actionConstants";

export const licence = (state = localStorage.getItem("wl-licence") || null, action) => {
  switch (action.type) {
    case RECEIVE_LICENCE:
      return action.value;
    default:
      return { ...state };
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
