import { connect } from 'react-redux';

import { fetchTrades } from '../../redux/actions/orders';
import HistoryRoute from './HistoryRoute';

const mapStateToProps = ({ trades, loading }) => ({ trades, loading });

const mapDispatchToProps = dispatch => {
  return {
    loadTrades: (number = 10) => {
      dispatch(fetchTrades(number))
    }
  }
}

const HistoryRouteContainer = connect(mapStateToProps, mapDispatchToProps)(HistoryRoute);

export default HistoryRouteContainer;