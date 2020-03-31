import { fetchBuyOrders, fetchSellOrders, fetchTrades } from './orders';
import { fetchStatsLastTradePrice } from './stats';
import { addNotification } from './actions';

import {serviceLoader} from '../../services/serviceLoader';

const orderBookService = serviceLoader('OrderBook');

/**
 * These actions are unusual in that they does not trigger any reducer state changes.
 * Instead they sets up watchers for specific websocket events
 */

export const watchForNewOrders = () => {
  return async (dispatch, getState) => {
    let events = await orderBookService.getAllEvents();
    //const { ethContext: { startBlock, address } } = getState();

    events.BuyOrderAdded().on('data', event => {
      console.log('buyOrderAdded');
      dispatch(fetchBuyOrders());
    });

    events.SellOrderAdded().on('data', event => {
      console.log('sellOrderAdded');
      dispatch(fetchSellOrders());
    });

  }
}

export const watchForMatchEvent = () => {
  return async (dispatch, getState) => {
    const { ethContext: { startBlock, address } } = getState();

    let events = await orderBookService.getEvents(startBlock);

    events.on('data', event => {
      dispatch(fetchBuyOrders());
      dispatch(fetchSellOrders());
      dispatch(fetchTrades());
      dispatch(fetchStatsLastTradePrice());

      if(!address) {
        return;
      }
      if (address === event.address) {
        dispatch(addNotification({
          id: event.transactionHash,
          text: 'One of your orders has been matched'
        }));
      }
    });
  }
}

export const watchForStatUpdatedEvent = () => {
  return async (dispatch, getState) => {
    const { ethContext: { startBlock:fromBlock } } = getState();

    const events = await orderBookService.getEvents();

    events.StatsChanged({fromBlock}).on('data', (event) => {
      dispatch(fetchStatsLastTradePrice());
    });
  }
}