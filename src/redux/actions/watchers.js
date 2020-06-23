import { fetchBuyOrders, fetchSellOrders, fetchTrades } from './orders';
import { fetchStatsLastTradePrice } from './stats';
import { fetchLicence } from './waterLicences';
import { addNotification } from './actions';

import {serviceLoader} from '../../services/serviceLoader';

const orderBookService = serviceLoader('OrderBook');
const licencesService = serviceLoader('Licences');

/**
 * These actions are unusual in that they does not trigger any reducer state changes.
 * Instead they sets up watchers for specific websocket events
 */
export const watchForLicenceCompletion = () => {
  return async (dispatch, getState) => {
    const { ethContext: { address } } = getState();

    let events = await licencesService.getAllEvents();

    events.LicenceCompleted({
        filter: { ethAccount: address }
      }).on('data', event => {
      dispatch(addNotification({
        id: event.transactionHash,
        text: 'Licence creation has been completed'
      }));
      dispatch(fetchLicence());
    });
  }
}


export const watchForDeletion = () => {
  return async dispatch => {
    let events = await orderBookService.getAllEvents();

    events.BuyOrderDeleted().on('data', () => {
      dispatch(fetchBuyOrders());
    });

    events.SellOrderDeleted().on('data', () => {
      dispatch(fetchSellOrders());
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

      if (event.event === "Matched") {
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