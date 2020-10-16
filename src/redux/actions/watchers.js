import { fetchBuyOrders, fetchSellOrders, fetchTrades } from "./orders";
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
  console.log('watching for licence completion');
  return async (dispatch, getState) => {
    const {
      ethContext: { address },
    } = getState();

    let events = await licencesService.getAllEvents();
    console.log(address);
    try {
      events
        .LicenceAdded()
        .on("data", event => {
          console.log(event);
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
    } catch (error) {
      console.log(error);
    }
  };
};

export const watchForDeletion = () => {
  return async dispatch => {
    let events = await orderBookService.getAllEvents();

    try {
      events.OrderDeleted().on("data", () => {
        dispatch(fetchBuyOrders());
        dispatch(fetchSellOrders());
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const watchForNewOrders = () => {
  return async dispatch => {
    let events = await orderBookService.getAllEvents();
    try {
      events.OrderAdded().on("data", () => {
        dispatch(fetchBuyOrders());
        dispatch(fetchSellOrders());
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const watchForMatchEvent = () => {
  return async (dispatch, getState) => {
    const { ethContext } = getState();
    let startBlock = ethContext.startBlock;
    let events = await historyService.getAllEvents();

    try {
      events.HistoryAdded({ fromBlock: startBlock }).on("data", event => {
        dispatch(fetchBuyOrders());
        dispatch(fetchSellOrders());
        dispatch(fetchTrades());

        if (event.event === "HistoryAdded") {
          dispatch(
            addNotification({
              id: event.transactionHash,
              text: "One of your orders has been matched",
            })
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};
