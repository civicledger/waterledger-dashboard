import { connect } from 'react-redux';

import { fetchEthContext, loadWalletForCurrentLicence } from '../redux/actions/actions';
import { watchForMatchEvent, watchForNewOrders } from '../redux/actions/watchers';
import { fetchStatsLastTradePrice } from '../redux/actions/stats';
import { fetchLicence } from '../redux/actions/waterLicences';

import App from './App';

const mapStateToProps = ({ ethContext, notifications }) => ({ ethContext, notifications });

const actions = { watchForMatchEvent, watchForNewOrders, loadWalletForCurrentLicence, fetchEthContext, fetchStatsLastTradePrice, fetchLicence };
const AppContainer = connect(mapStateToProps, actions)(App);

export default AppContainer;