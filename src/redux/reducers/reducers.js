import {
  RECEIVE_AUTH,
  RECEIVE_STATS_LAST_TRADE_PRICE,
  RECEIVE_ETH_CONTEXT,
  RECEIVE_LICENCES,
  RECEIVE_ADMIN_LICENCES,
  SET_ACTIVE_LICENCE
  } from '../actions/actionConstants';

import initialState from './initialState';

import { combineReducers } from 'redux';

import { defaultEthProviderStatus } from '../../utils/ethUtils';

import { buys, sells, trades, orderFormDetails } from './orders';
import { loading, modals, notifications } from './uiState';
import { waterAccounts, activeWaterAccount } from './waterLicences';

export const stats = (state = initialState.stats, action) => {
  switch(action.type){
    case RECEIVE_STATS_LAST_TRADE_PRICE:
      return { ...state, lastTradePrice: action.payload };
    default: return { ...state };
  }
}

export const ethContext = (state = defaultEthProviderStatus, action) => {
  switch(action.type) {
    case RECEIVE_ETH_CONTEXT:
      return {...action.payload};
    default: return state;
  }
}


export const auth = (state = false, action) => {
  switch(action.type) {
    case RECEIVE_AUTH:
      return action.value;
    default: return state;
  }
}

export const licences = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_LICENCES:
      return action.payload;
    default: return state;
  }
}

export const adminLicences = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_ADMIN_LICENCES:
      return action.payload;
    default: return state;
  }
}

export const activeLicence = (state = null, action) => {
  switch(action.type) {
    case SET_ACTIVE_LICENCE:
      return action.payload;
    default: return state;
  }
}

const rootReducer = combineReducers({
  buys,
  sells,
  orderFormDetails,
  ethContext,
  loading,
  modals,
  trades,
  stats,
  notifications,
  activeWaterAccount,
  waterAccounts,
  adminLicences,
  licences,
  auth,
  activeLicence
});

export default rootReducer;