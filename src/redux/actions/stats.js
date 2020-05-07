import { RECEIVE_STATS_LAST_TRADE_PRICE, RECEIVE_SCHEME } from './actionConstants';

import { serviceLoader } from '../../services/serviceLoader';

const orderBookService = serviceLoader('OrderBook');

export function fetchStatsLastTradePrice() {
  return dispatch => {
    return orderBookService.getLastTradePrice()
      .then(
        response => dispatch(receiveStatsLastTradePrice(response)),
        error => console.log('An error occurred.', error)
      )
  }
}

export const receiveStatsLastTradePrice = payload => ({ type: RECEIVE_STATS_LAST_TRADE_PRICE, payload });

export function fetchScheme() {
  return dispatch => {
    console.log('fetching scheme');
    return orderBookService.getScheme()
      .then(
        response => dispatch(receiveScheme(response)),
        error => console.log('An error occurred.', error)
      )
  }
}

export const receiveScheme = payload => ({ type: RECEIVE_SCHEME, payload });