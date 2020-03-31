import { connect } from 'react-redux';

import  { setAccountModal, setPasswordModal } from '../../redux/actions/actions';
import  { fetchLicence } from '../../redux/actions/waterLicences';
import  { fetchBuyOrders, fetchSellOrders, fetchTrades, openOrderForm } from '../../redux/actions/orders';

import Dashboard from './Dashboard';

const mapStateToProps = state => ({ ...state });

const boundActions = { setAccountModal, setPasswordModal, fetchBuyOrders, fetchSellOrders, fetchTrades, openOrderForm, fetchLicence };

export default connect(mapStateToProps, boundActions)(Dashboard);