import { RECEIVE_LAST_TRADE_PRICE, RECEIVE_SCHEME_NAME } from "./actionConstants";

import { serviceLoader } from "../../services/serviceLoader";

const orderBookService = serviceLoader("OrderBook");

export function fetchLastTradePrice() {
  return dispatch => {
    return orderBookService.getLastTradePrice().then(
      response => dispatch(receiveLastTradePrice(response)),
      error => console.log("An error occurred.", error)
    );
  };
}

export const receiveLastTradePrice = payload => ({ type: RECEIVE_LAST_TRADE_PRICE, payload });
export const receiveSchemeAddress = address => ({ type: "RECEIVE_SCHEME_ADDRESS", address });

export function fetchSchemeName() {
  return dispatch => {
    return orderBookService.getScheme().then(
      response => dispatch(receiveSchemeName(response)),
      error => console.log("An error occurred.", error)
    );
  };
}

export function fetchSchemeAddress() {
  return dispatch => {
    console.log("getting scheme address?");
    return orderBookService.getAddress().then(
      address => {
        dispatch(receiveSchemeAddress(address));
      },
      error => console.log("An error occurred.", error)
    );
  };
}

export const receiveSchemeName = payload => ({ type: RECEIVE_SCHEME_NAME, payload });
