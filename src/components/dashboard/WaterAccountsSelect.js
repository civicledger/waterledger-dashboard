import React from 'react';
import { connect } from 'react-redux';
import { setCurrentWaterAccount } from '../../redux/actions/waterLicences';

const WaterAccountsSelect = ({waterAccounts, setCurrentWaterAccount, activeWaterAccount}) => {
  return <select value={activeWaterAccount} onChange={({target}) => setCurrentWaterAccount(target.value)} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
  { waterAccounts.map(wa => <option key={wa.waterAccountId} value={wa.waterAccountId}>{wa.waterAccountId} - {wa.zoneString} - {wa.balance} ML</option>) }
</select>
}

const mapStateToProps = ({activeWaterAccount}) => ({activeWaterAccount});

export default connect(mapStateToProps, {setCurrentWaterAccount})(WaterAccountsSelect);
