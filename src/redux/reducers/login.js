import { createContext } from "react";

export const ACTIONS = {
  SET_USER: "SET_USER",
  UPDATE_USER: "UPDATE_USER",
  CLEAR_USER: "CLEAR_USER",
};

export const defaultLoginState = { user: null, token: null, loggedIn: false };

export const loginReducer = (state = defaultLoginState, { type, payload }) => {
  switch (type) {
    case ACTIONS.CLEAR_USER:
      return defaultLoginState;
    case ACTIONS.SET_USER:
      return { ...payload };
    case ACTIONS.UPDATE_USER:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};

export const LoginContext = createContext(loginReducer);
