import { SET_ACTIVE_WATER_ACCOUNT } from "./actionConstants";

import { addNotification } from "./actions";

export const setActiveWaterAccount = payload => ({ type: SET_ACTIVE_WATER_ACCOUNT, payload });

export function setCurrentWaterAccount(waterAccount) {
  return dispatch => {
    dispatch(
      addNotification({
        type: "success",
        text: `Active water account set to ${waterAccount}`,
      })
    );
  };
}
