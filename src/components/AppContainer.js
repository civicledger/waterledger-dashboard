import { connect } from 'react-redux';

import { fetchEthContext, loadWalletForCurrentLicence } from '../redux/actions/actions';
import { watchForMatchEvent, watchForNewOrders, watchForDeletion, watchForLicenceCompletion } from '../redux/actions/watchers';
import { fetchStatsLastTradePrice, fetchScheme } from '../redux/actions/stats';
import { loadCurrentAuth } from '../redux/actions/auth';
import { fetchLicence } from '../redux/actions/waterLicences';
import { loadAdminLicences } from '../redux/actions/auth';


import App from './App';

const mapStateToProps = ({ ethContext, notifications, auth }) => ({ ethContext, notifications, auth });

const actions = {
  watchForMatchEvent,
  watchForNewOrders,
  loadWalletForCurrentLicence,
  fetchEthContext,
  fetchStatsLastTradePrice,
  fetchScheme,
  fetchLicence,
  loadCurrentAuth,
  loadAdminLicences,
  watchForDeletion,
  watchForLicenceCompletion
};

const AppContainer = connect(mapStateToProps, actions)(App);

export default AppContainer;