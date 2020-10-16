import { RECEIVE_ETH_CONTEXT, ADD_NOTIFICATION, REMOVE_NOTIFICATION, MODAL_ACCEPT_ORDER_SET, MODAL_ORDER_FORM_SET } from "./actionConstants";

import { ethProviderStatus, web3 } from "../../utils/ethUtils";
import { receiveLicence } from "./waterLicences";
import { serviceLoader } from "../../services/serviceLoader";
const licencesService = serviceLoader("Licences");

export function fetchEthContext() {
  return dispatch => {
    return ethProviderStatus().then(
      response => dispatch(receiveEthContext(response)),
      error => console.log("An error occurred.", error)
    );
  };
}

export const createNotification = payload => ({ type: ADD_NOTIFICATION, payload });
export const removeNotification = value => ({ type: REMOVE_NOTIFICATION, value });

export const setOrderFormModal = (value = true) => ({ type: MODAL_ORDER_FORM_SET, value });
export const setAcceptOrderModal = (value = true) => ({ type: MODAL_ACCEPT_ORDER_SET, value });
export const receiveEthContext = payload => ({ type: RECEIVE_ETH_CONTEXT, payload });

export const accountProgressAdded = payload => ({ type: "ADD_ACCOUNT_PROGRESS", payload });
export const accountProgressAdditionFlight = id => ({ type: "ADD_ACCOUNT_PROGRESS_FLIGHT", id });
export const accountProgressAdditionCompleted = id => ({ type: "ADD_ACCOUNT_PROGRESS_COMPLETED", id });
export const accountProgressCompleted = () => ({ type: "ACCOUNT_LICENCE_COMPLETED" });

export const elementVisibilityShowButtons = value => ({
  type: "SET_SHOW_BUTTONS",
  value,
});
export const elementVisibilityShowAccountBanner = value => ({
  type: "SET_SHOW_ACCOUNT_BANNER",
  value,
});

export const addNotification = payload => {
  payload = { id: Date.now(), type: "info", ...payload };
  return dispatch => {
    dispatch(createNotification(payload));
    setTimeout(() => {
      dispatch(removeNotification(payload.id));
    }, 10000);
  };
};

export const loadWalletForCurrentLicence = () => {
  return dispatch => {
    const licenceId = localStorage.getItem("wlCurrentLicence");

    if (!licenceId) {
      dispatch(elementVisibilityShowAccountBanner(true));
      return;
    }
    const status = {};
    const password = localStorage.getItem("walletPassword");
    const wallet = web3.eth.accounts.wallet.load(password, "wl-wallet");

    if (!localStorage.getItem("wlLicence")) {
      licencesService.apiGetLicence(licenceId).then(({ licence }) => {
        console.log(licence);
        dispatch(receiveLicence(licence.accountId));
        localStorage.setItem("wlLicence", licence.accountId);
      });
    }

    const index = localStorage.getItem(`${licenceId}-wlAccountIndex`);
    status.address = wallet[index].address;
    status.walletAccountsAvailable = wallet.length > 0;
    status.isReadOnly = false;
    status.hasLocalStorageWallet = true;
    status.isSignedIn = true;
    status.canSignIn = true;
    dispatch(receiveEthContext(status));
    web3.eth.defaultAccount = wallet[index].address;
  };
};
