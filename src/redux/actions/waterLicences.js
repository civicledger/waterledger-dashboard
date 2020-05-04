import { v4 as uuid } from 'uuid';

import {
  RECEIVE_LICENCE, RECEIVE_ZONE_BALANCE,
  RECEIVE_WATER_ACCOUNTS, SET_ACTIVE_WATER_ACCOUNT
 } from './actionConstants';

import { web3 } from '../../utils/ethUtils';

import { serviceLoader } from '../../services/serviceLoader';

import { receiveEthContext } from './actions';

const zonesService = serviceLoader('Zones');
const licencesService = serviceLoader('Licences');

export const receiveZoneBalance = payload => ({ type: RECEIVE_ZONE_BALANCE, payload });
export const receiveLicence = payload => ({ type: RECEIVE_LICENCE, payload });
export const setActiveWaterAccount = payload => ({ type: SET_ACTIVE_WATER_ACCOUNT, payload });
export const receiveWaterAccounts = payload => ({ type: RECEIVE_WATER_ACCOUNTS, payload });

export function fetchWaterBalances() {
  return (dispatch, getState) => {
    const { ethContext, waterAccounts } = getState();
    waterAccounts.forEach(async wa => {
      dispatch(fetchZoneBalance(ethContext.address, wa.zoneIndex));
    });
  }
}

export function fetchZoneBalance(address, zoneIndex) {
  return dispatch => {
    return zonesService.getZoneBalanceFor(address, zoneIndex)
      .then(
        balance => dispatch(receiveZoneBalance({balance, zoneIndex})),
        error => console.log('An error occurred.', error)
      )
  }
}

export const claimWaterAccountsForLicence = licence => {
  return dispatch => {
    const id = licence._id;

    const password = uuid();

    const account = web3.eth.accounts.create(uuid());

    const wallet = web3.eth.accounts.wallet.create();

    wallet.add(account);

    localStorage.setItem(`${id}-wlAccountIndex`, wallet.length - 1);
    localStorage.setItem('walletPassword', password);

    licence.ethAccount = account.address;

    licencesService.apiActivateLicence(id, licence);

    dispatch(setCurrentWaterAccount(licence.waterAccounts[0].waterAccountId));
    dispatch(receiveWaterAccounts(licence.waterAccounts));

    web3.eth.defaultAccount = account.address;

    wallet.save(password, 'wl-wallet');

    const status = {};
    status.walletAccountsAvailable = wallet.length > 0;
    status.isReadOnly = false;
    status.hasLocalStorageWallet = true;
    status.isSignedIn = true;
    status.canSignIn = true;
    dispatch(receiveEthContext(status));

    let licences = JSON.parse(localStorage.getItem('wlLicences')) || [];
    licences.push(id);
    localStorage.setItem('wlLicences', JSON.stringify(licences));
    localStorage.setItem('wlCurrentLicence', id);
  }

}

export function fetchLicence(licenceId = null) {
  return dispatch => {
    if(localStorage.getItem('wlCurrentLicence')){
      return licencesService.getWaterAccounts()
        .then(response => {
            dispatch(receiveWaterAccounts(response));
            dispatch(fetchWaterBalances());
            let waterAccountId = localStorage.getItem('wlWaterAccount');
            const waterAccountFound = response.find(wa => wa.waterAccountId === waterAccountId);

            if (!waterAccountFound) {
              waterAccountId = response[0].waterAccountId;
            }

            dispatch(setCurrentWaterAccount(waterAccountId));

          },
          error => console.log('An error occurred.', error)
        );
      }
    }
}

export function setCurrentWaterAccount(waterAccountId) {
  localStorage.setItem('wlWaterAccount', waterAccountId);
  return dispatch => {
    dispatch(setActiveWaterAccount(waterAccountId));
  }
}