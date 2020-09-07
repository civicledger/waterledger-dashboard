import { fetchBuyOrders, fetchSellOrders, fetchTrades } from "./orders";
import { fetchLastTradePrice } from "./scheme";
import { fetchLicence } from "./waterLicences";
import {
  addNotification,
  accountProgressCompleted,
  accountProgressAdded,
  elementVisibilityShowButtons,
  elementVisibilityShowAccountBanner,
} from "./actions";

import { serviceLoader } from "../../services/serviceLoader";

const orderBookService = serviceLoader("OrderBook");
const historyService = serviceLoader("OrderHistory");
const licencesService = serviceLoader("Licences");

/**
 * These actions are unusual in that they does not trigger any reducer state changes.
 * Instead they sets up watchers for specific websocket events
 */
export const watchForLicenceCompletion = () => {
  return async (dispatch, getState) => {
    const {
      ethContext: { address },
    } = getState();

    let events = await licencesService.getAllEvents();

    events
      .LicenceAdded({
        filter: { ethAccount: address },
      })
      .on("data", event => {
        dispatch(accountProgressAdded({ text: "Account has been added" }));
        new Promise(r => setTimeout(r, 4000)).then(() => {
          dispatch(accountProgressAdded({ text: "Getting Water Account Details" }));
        });
      });

    events
      .WaterAccountAdded({
        filter: { ethAccount: address },
      })
      .on("data", event => {
        dispatch(accountProgressAdded({ text: "Water Account Added" }));
      });

    events
      .LicenceCompleted({
        filter: { ethAccount: address },
      })
      .on("data", async event => {
        dispatch(accountProgressAdded({ text: "Licence Creation Completed" }));
        dispatch(accountProgressCompleted());
        dispatch(fetchLicence());

        await new Promise(r => setTimeout(r, 2000));
        dispatch(elementVisibilityShowButtons(true));
        await new Promise(r => setTimeout(r, 7000));
        dispatch(elementVisibilityShowAccountBanner(false));
      });
  };
};

export const watchForDeletion = () => {
  return async dispatch => {
    let events = await orderBookService.getAllEvents();

    events.BuyOrderDeleted().on("data", () => {
      dispatch(fetchBuyOrders());
    });

    events.SellOrderDeleted().on("data", () => {
      dispatch(fetchSellOrders());
    });
  };
};

export const watchForNewOrders = () => {
  return async dispatch => {
    let events = await orderBookService.getAllEvents();

    events.BuyOrderAdded().on("data", () => {
      dispatch(fetchBuyOrders());
    });

    events.SellOrderAdded().on("data", () => {
      dispatch(fetchSellOrders());
    });
  };
};

export const watchForMatchEvent = () => {
  return async (dispatch, getState) => {
    const { ethContext } = getState();
    let startBlock = ethContext.startBlock;
    let events = await historyService.getAllEvents();

    events.HistoryAdded({ fromBlock: startBlock }).on("data", event => {
      dispatch(fetchBuyOrders());
      dispatch(fetchSellOrders());
      dispatch(fetchTrades());
      dispatch(fetchLastTradePrice());

      if (event.event === "HistoryAdded") {
        dispatch(
          addNotification({
            id: event.transactionHash,
            text: "One of your orders has been matched",
          })
        );
      }
    });
  };
};

export const watchForStatUpdatedEvent = () => {
  return async (dispatch, getState) => {
    const {
      ethContext: { startBlock: fromBlock },
    } = getState();

    const events = await orderBookService.getEvents();

    events.StatsChanged({ fromBlock }).on("data", event => {
      dispatch(fetchLastTradePrice());
    });
  };
};
