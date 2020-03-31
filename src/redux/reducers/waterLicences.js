import { RECEIVE_WATER_ACCOUNTS, SET_ACTIVE_WATER_ACCOUNT, SET_ACTIVE_LICENCE, RECEIVE_LICENCE, RECEIVE_ZONE_BALANCE } from '../actions/actionConstants';



export const licence = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_LICENCE:
      return action.payload;
    default: return {...state};
  }
}

export const activeLicence = (state = localStorage.getItem('wlLicence'), action) => {
  switch(action.type) {
    case SET_ACTIVE_LICENCE:
      return action.payload;
    default: return state;
  }
}

export const waterAccounts = (state = [], action) => {
  switch(action.type){
    case RECEIVE_WATER_ACCOUNTS:
      return action.payload;
    case RECEIVE_ZONE_BALANCE:
      return state.map(wa => {
        if (wa.zoneIndex === action.payload.zoneIndex) {
          wa.balance = action.payload.balance;
        }
        return wa;
      });
    default: return state;
  }
}

export const activeWaterAccount = (state = localStorage.getItem('wlLicence'), action) => {
  switch(action.type) {
    case SET_ACTIVE_WATER_ACCOUNT:
      return action.payload;
    default: return state;
  }
}
