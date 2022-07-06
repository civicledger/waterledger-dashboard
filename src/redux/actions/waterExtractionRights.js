import { SET_ACTIVE_WATER_ACCOUNT } from "./actionConstants";

import { addNotification } from "./actions";

export const setActiveWaterAccount = payload => ({ type: SET_ACTIVE_WATER_ACCOUNT, payload });

export function setCurrentWaterAccount(waterAccount, accountString) {
  return dispatch => {
    dispatch(
      addNotification({
        type: "success",
        text: `Active ${accountString} set to ${waterAccount}`,
      })
    );
  };
}
