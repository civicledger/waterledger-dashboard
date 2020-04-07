import { connect } from 'react-redux';

import  { setAccountModal, setPasswordModal } from '../../redux/actions/actions';
import  { fetchBuyOrders, fetchSellOrders, fetchTrades, openOrderForm } from '../../redux/actions/orders';

import Dashboard from './Dashboard';

const mapStateToProps = state => ({ ...state });

const boundActions = { setAccountModal, setPasswordModal, fetchBuyOrders, fetchSellOrders, fetchTrades, openOrderForm };

export default connect(mapStateToProps, boundActions)(Dashboard);