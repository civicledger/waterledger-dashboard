import { RECEIVE_STATS_LAST_TRADE_PRICE } from './actionConstants';

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