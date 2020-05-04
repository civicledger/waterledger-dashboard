import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { loadWalletForCurrentLicence } from '../../redux/actions/actions';
import { claimWaterAccountsForLicence, setCurrentWaterAccount } from '../../redux/actions/waterLicences';
import { switchLicences } from '../../redux/actions/auth';

export default props => {
  const activeLicence = useSelector(state => state.activeLicence);
  const dispatch = useDispatch();

  if(props.licences.length === 0) return <p className="mb-5">No matching licences found</p>;

  return <table className="mb-5 border bg-white">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-2">Name</th>
        <th className="p-2">Account</th>
        <th className="p-2">Water Accounts</th>
        <th className="p-2">Migrated</th>
        <th className="p-2"></th>
      </tr>
    </thead>
    <tbody>
    { props.licences.map(l => {
      const isActiveLicence = l._id === activeLicence
      const classes = {'font-bold': isActiveLicence};
      return <tr key={l.accountId} className={classNames(classes)}>
        <td className="p-2">{l.name}</td>
        <td className="p-2">{l.accountId}</td>
        <td className="p-2 text-center">{l.waterAccounts.length}</td>
        <td className="p-2 text-center">{l.migrated ? 'Yes' : 'No'}</td>

        <td className="p-2">

          { !props.unclaimed && !isActiveLicence && <button className="text-sm text-green-600" onClick={() => {
            dispatch(setCurrentWaterAccount(l.waterAccounts[0].waterAccountId));
            dispatch(switchLicences(l._id));
            dispatch(loadWalletForCurrentLicence());
          }}>
            <i className="fal fa-check-circle mr-1"></i> Change
          </button>}

          { props.unclaimed && <button className="text-sm text-green-600" onClick={() => dispatch(claimWaterAccountsForLicence(l))}>
            <i className="fal fa-check-circle mr-1"></i> Claim
          </button> }

        </td>
      </tr>})
      }
    </tbody>
  </table>
}