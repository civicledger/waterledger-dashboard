import { RECEIVE_AUTH, RECEIVE_STATS_LAST_TRADE_PRICE, RECEIVE_ETH_CONTEXT } from '../actions/actionConstants';

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
  auth
});

export default rootReducer;