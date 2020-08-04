import { connect } from "react-redux";

import { fetchEthContext, loadWalletForCurrentLicence } from "../redux/actions/actions";
import { watchForMatchEvent, watchForNewOrders, watchForDeletion, watchForLicenceCompletion } from "../redux/actions/watchers";
import { fetchLastTradePrice, fetchSchemeName, fetchSchemeAddress } from "../redux/actions/scheme";
import { loadCurrentAuth } from "../redux/actions/auth";
import { fetchLicence } from "../redux/actions/waterLicences";
import { loadAdminLicences } from "../redux/actions/auth";

import App from "./App";

const mapStateToProps = ({ ethContext, notifications, auth }) => ({ ethContext, notifications, auth });

const actions = {
  watchForMatchEvent,
  watchForNewOrders,
  loadWalletForCurrentLicence,
  fetchEthContext,
  fetchLastTradePrice,
  fetchSchemeName,
  fetchSchemeAddress,
  fetchLicence,
  loadCurrentAuth,
  loadAdminLicences,
  watchForDeletion,
  watchForLicenceCompletion,
};

const AppContainer = connect(mapStateToProps, actions)(App);

export default AppContainer;
