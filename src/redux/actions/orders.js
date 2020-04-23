import {
  CONFIRM_ORDER,
  FETCH_BUY_ORDERS,
  FETCH_SELL_ORDERS,
  FETCH_TRADES,
  RECEIVE_BUY_ORDERS,
  RECEIVE_SELL_ORDERS,
  SELECT_ORDER_TYPE,
  SET_ORDER_FORM_VALUES,
  RECEIVE_TRADES
} from './actionConstants';

import { addNotification, setOrderFormModal, setOrderFormFixedModal } from './actions';

import { web3 } from '../../utils/ethUtils';
import { errorMessage } from '../../utils/format';

import {serviceLoader} from '../../services/serviceLoader';

const orderService = serviceLoader('OrderBook');
const orderHistoryService = serviceLoader('OrderHistory');

export const confirmOrder = id => ({ type: CONFIRM_ORDER, id});
export const selectOrderType = type => ({ type: SELECT_ORDER_TYPE, selected: type })
export const setOrderFormValues = payload => ({ type: SET_ORDER_FORM_VALUES, payload });

export const receiveBuyOrders = payload => ({ type: RECEIVE_BUY_ORDERS, payload });
export const receiveSellOrders = payload => ({ type: RECEIVE_SELL_ORDERS, payload });
export const receiveTrades = payload => ({ type: RECEIVE_TRADES, payload });

export const startFetchBuyOrders = () => ({ type: FETCH_BUY_ORDERS });
export const startFetchSellOrders = () => ({ type: FETCH_SELL_ORDERS });
export const startFetchTrades = () => ({ type: FETCH_TRADES });

export const openOrderForm = orderForm => {
  return dispatch => {
    dispatch(selectOrderType(orderForm.type));
    dispatch(setOrderFormValues(orderForm));
    if(orderForm.quantity && orderForm.quantity) {
      dispatch(setOrderFormFixedModal());
    } else {
      dispatch(setOrderFormModal());
    }
  }
}

export function fetchBuyOrders(number = 10) {
  return dispatch => {
    dispatch(startFetchBuyOrders());
    return orderService.getBuyOrders(number)
      .then(
        response => dispatch(receiveBuyOrders(response)),
        error => console.log('An error occurred.', error)
      )
  }
}

export function fetchSellOrders(number = 10) {
  return dispatch => {
    dispatch(startFetchSellOrders());
    return orderService.getSellOrders(number)
      .then(
        response => dispatch(receiveSellOrders(response)),
        error => console.log('An error occurred.', error)
      )
  }
}

export function fetchTrades(number = 10) {
  return dispatch => {
    return orderHistoryService.getHistory(number)
      .then(
        response => dispatch(receiveTrades(response)),
        error => console.log('An error occurred.', error)
      )
  }
}

export const submitBuyOrder = (price, quantity, period = 0) => {
  return (dispatch, getState) => {

    const { activeWaterAccount, waterAccounts } = getState();
    const { zoneIndex } = waterAccounts.find(l => activeWaterAccount === l.waterAccountId);

    orderService.addBuyOrder(price, quantity, zoneIndex, period).then(rawTransaction => {
      web3.eth.sendSignedTransaction(rawTransaction)
      .on('transactionHash', hash => {
        dispatch(addNotification({
          id: `added-${hash}`,
          text: 'Your buy order is being added'
        }));
        orderService.awaitConfirmationForHash(hash).then(
          receipt => {
            dispatch(addNotification({
              id: `confirmed-${hash}`,
              type: 'success',
              text: 'Your buy order has been confirmed'
            }));
            dispatch(fetchBuyOrders());
          }
        );
      })
      .on('error', function(error) {
        dispatch(addNotification({
          type: 'error',
          text: errorMessage(error)
        }));
      });
    });
  }
}

export const deleteBuyOrder = index => {
  return dispatch => {
    orderService.deleteBuyOrder(index).then(rawTransaction => {
      web3.eth.sendSignedTransaction(rawTransaction)
      .on('transactionHash', hash => {
        dispatch(addNotification({
          id: `added-${hash}`,
          text: 'Buy order is being removed'
        }));
        orderService.awaitConfirmationForHash(hash).then(
          receipt => {
            dispatch(addNotification({
              id: `confirmed-${hash}`,
              type: 'success',
              text: 'Your buy order has been removed'
            }));
            dispatch(fetchBuyOrders());
          }
        );
      })
      .on('error', function(error) {
        dispatch(addNotification({
          type: 'error',
          text: errorMessage(error)
        }));
      });
    });
  }
}

export const deleteSellOrder = index => {
  return dispatch => {
    orderService.deleteSellOrder(index).then(rawTransaction => {
      web3.eth.sendSignedTransaction(rawTransaction)
      .on('transactionHash', hash => {
        dispatch(addNotification({
          id: `added-${hash}`,
          text: 'Sell order is being removed'
        }));
        orderService.awaitConfirmationForHash(hash).then(
          receipt => {
            dispatch(addNotification({
              id: `confirmed-${hash}`,
              type: 'success',
              text: 'Your sell order has been removed'
            }));
            dispatch(fetchSellOrders());
          }
        );
      })
      .on('error', function(error) {
        dispatch(addNotification({
          type: 'error',
          text: errorMessage(error)
        }));
      });
    });
  }
}

export const submitSellOrder = (price, quantity) => {
  return (dispatch, getState) => {

    const { activeWaterAccount, waterAccounts } = getState();

    console.log(activeWaterAccount);
    console.log(waterAccounts);

    const { zoneIndex } = waterAccounts.find(l => activeWaterAccount === l.waterAccountId);

    orderService.addSellOrder(price, quantity, zoneIndex).then(rawTransaction => {

      web3.eth.sendSignedTransaction(rawTransaction)
      .on('transactionHash', hash => {

        dispatch(addNotification({
          id: `added-${hash}`,
          text: 'Your sell order is being added'
        }));

        orderService.awaitConfirmationForHash(hash).then(
          receipt => {
            dispatch(addNotification({
              id: `confirmed-${hash}`,
              type: 'success',
              text: 'Your sell order has been confirmed'
            }));

            dispatch(fetchSellOrders());
          }
        );
      })
      .on('error', error => {
        console.log(error);
        dispatch(addNotification({
          type: 'error',
          text: errorMessage(error)
        }));
      });
    });
  }
}
