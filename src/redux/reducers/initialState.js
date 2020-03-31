import {ORDER_TYPE_BUY} from '../actions/actionConstants';

const initialState = {
  orderFormDetails: {
    type: ORDER_TYPE_BUY,
    price: '',
    volume: ''
  },
  buys: [],
  loading: {
    buy: false,
    sell: false,
    trades: false,
    statsAverageValue: false,
    statsTotalVolume: false,
    licenses: false,
    allocation: false
  },
  stats: {
    lastTradePrice: 0
  },
  modals: {
    license: false,
    waterAllocation: false,
    audAllocation: false,
    account: false,
    password: false,
    orderForm: false
  },
  sells: [],
  trades: [],
  waterLicences: []
}

export default initialState;