import {
  RECEIVE_WATER_ACCOUNTS,
  SET_ACTIVE_WATER_ACCOUNT,
  SET_ACTIVE_LICENCE,
  RECEIVE_LICENCE,
  RECEIVE_ZONE_BALANCES,
} from "../actions/actionConstants";

export const licence = (state = localStorage.getItem("wlLicence") || null, action) => {
  switch (action.type) {
    case RECEIVE_LICENCE:
      return action.value;
    default:
      return { ...state };
  }
};

export const activeLicence = (state = localStorage.getItem("wlCurrentLicence"), action) => {
  switch (action.type) {
    case SET_ACTIVE_LICENCE:
      return action.payload;
    default:
      return state;
  }
};

export const waterAccounts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_WATER_ACCOUNTS:
      return action.payload;
    case RECEIVE_ZONE_BALANCES:
      return state.map(wa => {
        wa.balance = action.payload[wa.zoneIndex];
        return wa;
      });
    default:
      return state;
  }
};

export const activeWaterAccount = (state = localStorage.getItem("wlWaterAccount"), action) => {
  switch (action.type) {
    case SET_ACTIVE_WATER_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
};
