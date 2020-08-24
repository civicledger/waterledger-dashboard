import { ORDER_TYPE_BUY } from "../actions/actionConstants";

const initialState = {
  orderFormDetails: {
    type: ORDER_TYPE_BUY,
    price: "",
    quantity: "",
  },
  buys: [],
  loading: {
    buy: false,
    sell: false,
    trades: false,
    licenses: false,
    allocation: false,
  },
  modals: {
    license: false,
    waterAllocation: false,
    audAllocation: false,
    account: false,
    password: false,
    orderForm: false,
  },
  sells: [],
  trades: [],
  waterLicences: [],
};

export default initialState;
