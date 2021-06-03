// import { accountProgressCompleted, accountProgressAdded, elementVisibilityShowButtons, elementVisibilityShowAccountBanner } from "./actions";

// import { serviceLoader } from "../../services/serviceLoader";
// const licencesService = serviceLoader("Licences");

/**
 * These actions are unusual in that they does not trigger any reducer state changes.
 * Instead they sets up watchers for specific websocket events
 */
export const watchForLicenceCompletion = () => {
  return async (dispatch, getState) => {
    //   const {
    //     ethContext: { address },
    //   } = getState();
    //   let events = await licencesService.getAllEvents();
    //   try {
    //     events.LicenceAdded().on("data", event => {
    //       dispatch(accountProgressAdded({ text: "Account has been added" }));
    //       new Promise(r => setTimeout(r, 4000)).then(() => {
    //         dispatch(accountProgressAdded({ text: "Getting Water Account Details" }));
    //       });
    //     });
    //     events
    //       .WaterAccountAdded({
    //         filter: { ethAccount: address },
    //       })
    //       .on("data", event => {
    //         dispatch(accountProgressAdded({ text: "Water Account Added" }));
    //       });
    //     events
    //       .LicenceCompleted({
    //         filter: { ethAccount: address },
    //       })
    //       .on("data", async event => {
    //         dispatch(accountProgressAdded({ text: "Licence Creation Completed" }));
    //         dispatch(accountProgressCompleted());
    //         await new Promise(r => setTimeout(r, 2000));
    //         dispatch(elementVisibilityShowButtons(true));
    //         await new Promise(r => setTimeout(r, 7000));
    //         dispatch(elementVisibilityShowAccountBanner(false));
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
  };
};
