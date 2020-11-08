import { v4 as uuid } from "uuid";

import { RECEIVE_ZONE_BALANCES, SET_ACTIVE_WATER_ACCOUNT } from "./actionConstants";

import { web3 } from "../../utils/ethUtils";

import { serviceLoader } from "../../services/serviceLoader";

import { receiveEthContext, addNotification, accountProgressAdded } from "./actions";

const licencesService = serviceLoader("Licences");

export const receiveZoneBalances = payload => ({ type: RECEIVE_ZONE_BALANCES, payload });
export const setActiveWaterAccount = payload => ({ type: SET_ACTIVE_WATER_ACCOUNT, payload });

export const claimWaterAccountsForLicence = (licence, code) => {
  return async dispatch => {
    const id = licence.id;

    const password = uuid();

    const account = web3.eth.accounts.create(uuid());

    const wallet = web3.eth.accounts.wallet.create();

    wallet.add(account);

    localStorage.setItem("wl-walletPassword", password);

    licence.ethAccount = account.address;

    await licencesService.apiActivateLicence(id, code, account.address);
    dispatch(setCurrentWaterAccount(licence.accounts[0].waterAccount));
    dispatch(accountProgressAdded({ text: "Storing Account Details" }));
    web3.eth.defaultAccount = account.address;

    wallet.save(password, "wl-wallet");

    const status = {};
    status.walletAccountsAvailable = wallet.length > 0;
    status.isReadOnly = false;
    status.hasLocalStorageWallet = true;
    status.isSignedIn = true;
    status.canSignIn = true;
    status.address = account.address;
    status.statusLoaded = true;
    dispatch(receiveEthContext(status));

    localStorage.setItem("wl-licence", id);
    dispatch(accountProgressAdded({ text: "Updating Water Account Balances" }));
  };
};

export function setCurrentWaterAccount(waterAccount) {
  localStorage.setItem("wl-waterAccount", waterAccount);
  return dispatch => {
    dispatch(
      addNotification({
        type: "success",
        text: `Active water account set to ${waterAccount}`,
      })
    );
    dispatch(setActiveWaterAccount(waterAccount));
  };
}
