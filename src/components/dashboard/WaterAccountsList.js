import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { setCurrentWaterAccount } from '../../redux/actions/waterLicences';

const WaterAccountsList = ({waterAccounts, setCurrentWaterAccount, activeWaterAccount}) => {
  return <ul className="list-reset">
  { waterAccounts.map(wa => <li key={wa.waterAccountId}
    className={
      classNames(
        "border p-2 border-t-0 text-gray-700 hover:text-gray-800 cursor-pointer",
        {"bg-gray-400": activeWaterAccount === wa.waterAccountId},
        {"bg-gray-200 hover:bg-gray-400": activeWaterAccount !== wa.waterAccountId}
      )
    }
    onClick={() => setCurrentWaterAccount(wa.waterAccountId)}>
    <span className="mr-5">{wa.waterAccountId}</span>
    <span className="mr-5">{wa.zoneString}</span>
    <span className="mr-5">{wa.zoneIndex}</span>
    <span className="mr-5">{wa.balance && `${wa.balance} ML`}</span>

  </li>) }
</ul>}

const mapStateToProps = ({activeWaterAccount}) => ({activeWaterAccount});

export default connect(mapStateToProps, {setCurrentWaterAccount})(WaterAccountsList);