import { SELECT_ORDER_TYPE, SET_ORDER_FORM_VALUES, SET_ACCEPT_FORM_VALUES } from "../actions/actionConstants";

import initialState from "./initialState";

export const orderType = (state = initialState.orderType, action) => {
  switch (action.type) {
    case SELECT_ORDER_TYPE:
      return action.selected;
    default:
      return state;
  }
};

export const orderFormDetails = (state = initialState.orderFormDetails, action) => {
  switch (action.type) {
    case SELECT_ORDER_TYPE:
      return { ...state, type: action.selected };
    case SET_ORDER_FORM_VALUES:
      return { ...action.payload };
    default:
      return { ...state };
  }
};

export const acceptFormDetails = (state = initialState.acceptFormDetails, action) => {
  switch (action.type) {
    case SET_ACCEPT_FORM_VALUES:
      return { ...action.payload };
    default:
      return { ...state };
  }
};
