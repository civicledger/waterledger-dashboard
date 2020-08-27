import { RECEIVE_LAST_TRADE_PRICE, RECEIVE_SCHEME_NAME } from "./actionConstants";

import { serviceLoader } from "../../services/serviceLoader";

const orderBookService = serviceLoader("OrderBook");

export function fetchLastTradePrice() {
  return dispatch => {
    return orderBookService
      .getLastTradePrice()
      .then(response => dispatch(receiveLastTradePrice(response)))
      .catch(error => dispatch(receiveLastTradePrice("NA")));
  };
}

export const receiveLastTradePrice = payload => ({ type: RECEIVE_LAST_TRADE_PRICE, payload });
export const receiveSchemeAddress = address => ({ type: "RECEIVE_SCHEME_ADDRESS", address });

export function fetchSchemeName() {
  return dispatch => {
    return orderBookService
      .getScheme()
      .then(response => dispatch(receiveSchemeName(response)))
      .catch(error => dispatch(receiveSchemeName("CONTRACT NOT FOUND")));
  };
}

export function fetchSchemeAddress() {
  return dispatch => {
    return orderBookService
      .getAddress()
      .then(address => {
        dispatch(receiveSchemeAddress(address));
      })
      .catch(error => dispatch(receiveSchemeAddress("NOT FOUND")));
  };
}

export const receiveSchemeName = payload => ({ type: RECEIVE_SCHEME_NAME, payload });
