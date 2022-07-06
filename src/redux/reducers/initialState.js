import { ORDER_TYPE_BUY } from "../actions/actionConstants";

const initialState = {
  orderFormDetails: {
    type: ORDER_TYPE_BUY,
    price: "",
    quantity: "",
  },
  acceptFormDetails: {
    type: ORDER_TYPE_BUY,
    id: "",
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
    acceptOrder: false,
    orderForm: false,
  },
  sells: [],
  trades: [],
  waterExtractionRights: [],
};

export default initialState;
