import { createContext } from "react";

export const ACTIONS = {
  SET_USER: "SET_USER",
  LOG_IN_USER: "LOG_IN_USER",
  UPDATE_USER: "UPDATE_USER",
  CLEAR_USER: "CLEAR_USER",
  SET_ACTIVE_WATER_ACCOUNT: "SET_ACTIVE_WATER_ACCOUNT",
  SET_EXTRACTION_RIGHT_ID: "SET_EXTRACTION_RIGHT_ID",
};

export const defaultUserState = {
  user: null,
  token: null,
  extractionRightId: null,
  activeWaterAccount: null,
  loggedIn: false,
};

export const userReducer = (state = defaultUserState, { type, payload }) => {
  switch (type) {
    case ACTIONS.CLEAR_USER:
      return defaultUserState;
    case ACTIONS.SET_USER:
      return { ...payload };
    case ACTIONS.UPDATE_USER:
      return { ...state, ...payload };
    case ACTIONS.LOG_IN_USER:
      return { ...payload, loggedIn: true };
    case ACTIONS.SET_ACTIVE_WATER_ACCOUNT:
      return { ...state, activeWaterAccount: payload };
    case ACTIONS.SET_EXTRACTION_RIGHT_ID:
      return { ...state, extractionRightId: payload };
    default:
      return { ...state };
  }
};

export const UserContext = createContext(null);
