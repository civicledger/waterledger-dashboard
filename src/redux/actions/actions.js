import {
  RECEIVE_ETH_CONTEXT,
  ADD_NOTIFICATION, REMOVE_NOTIFICATION,
  MODAL_ACCOUNT_SET,
  MODAL_PASSWORD_SET,
  MODAL_ORDER_FORM_SET,
  MODAL_ORDER_FORM_FIXED_SET
} from './actionConstants';

import { ethProviderStatus, web3 } from '../../utils/ethUtils';

export function fetchEthContext() {
  return dispatch => {
    return ethProviderStatus()
      .then(
        response => dispatch(receiveEthContext(response)),
        error => console.log('An error occurred.', error)
      )
  }
}

export const createNotification = payload => ({ type: ADD_NOTIFICATION, payload });
export const removeNotification = id => ({ type: REMOVE_NOTIFICATION, value: id });
export const setAccountModal = (value = true) => ({ type: MODAL_ACCOUNT_SET, value });
export const setPasswordModal = (value = true) => ({ type: MODAL_PASSWORD_SET, value });
export const setOrderFormModal = (value = true) => ({ type: MODAL_ORDER_FORM_SET, value });
export const setOrderFormFixedModal = (value = true) => ({ type: MODAL_ORDER_FORM_FIXED_SET, value });
export const receiveEthContext = payload => ({ type: RECEIVE_ETH_CONTEXT, payload });

export const addNotification = payload => {
  payload = { id: Date.now(), type: 'info', ...payload }
  return dispatch => {
    dispatch(createNotification(payload));
    setTimeout(() => {
      dispatch(removeNotification(payload.id))
    }, 15000);
  }
}

export const loadWalletForCurrentLicence = () => {

  return dispatch => {
    const licenceId = localStorage.getItem('wlCurrentLicence');
    if(!licenceId) return;
    const status = {};
    const password = localStorage.getItem('walletPassword');
    const wallet = web3.eth.accounts.wallet.load(password, 'wl-wallet');

    const index = localStorage.getItem(`${licenceId}-wlAccountIndex`);
    status.address = wallet[index].address;
    status.walletAccountsAvailable = wallet.length > 0;
    status.isReadOnly = false;
    status.hasLocalStorageWallet = true;
    status.isSignedIn = true;
    status.canSignIn = true;
    dispatch(receiveEthContext(status));
    web3.eth.defaultAccount = wallet[index].address;
  }
}