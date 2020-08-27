import { connect } from "react-redux";

import { setCurrentWaterAccount } from "../../redux/actions/waterLicences";

import Dashboard from "./Dashboard";

const mapStateToProps = state => ({ ...state });

const boundActions = { fetchBuyOrders, fetchSellOrders, fetchTrades, openOrderForm, deleteBuyOrder, deleteSellOrder, setCurrentWaterAccount };

export default connect(mapStateToProps, boundActions)(Dashboard);
