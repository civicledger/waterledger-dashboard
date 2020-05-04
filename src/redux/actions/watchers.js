import { fetchBuyOrders, fetchSellOrders, fetchTrades } from './orders';
import { fetchStatsLastTradePrice } from './stats';
import { addNotification } from './actions';

import {serviceLoader} from '../../services/serviceLoader';

const orderBookService = serviceLoader('OrderBook');
const licencesService = serviceLoader('Licences');

/**
 * These actions are unusual in that they does not trigger any reducer state changes.
 * Instead they sets up watchers for specific websocket events
 */
export const watchForNewLicence = () => {
  return async dispatch => {
    let events = await licencesService.getAllEvents();

    events.LicenceAdded().on('data', () => {
      dispatch(fetchBuyOrders());
    });
  }
}

export const watchForAllocation = () => {
  return async dispatch => {
    let events = await licencesService.getAllEvents();

    events.LicenceAdded().on('data', () => {
      dispatch(fetchBuyOrders());
    });
  }
}


export const watchForNewOrders = () => {
  return async dispatch => {
    let events = await orderBookService.getAllEvents();

    events.BuyOrderAdded().on('data', () => {
      dispatch(fetchBuyOrders());
    });

    events.SellOrderAdded().on('data', () => {
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