import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentWaterAccount } from "../../redux/actions/waterLicences";

const WaterAccountsSelect = () => {
  const dispatch = useDispatch();

  const activeWaterAccount = useSelector(state => state.activeWaterAccount);
  const waterAccounts = useSelector(state => state.waterAccounts);

  return (
    <select
      value={activeWaterAccount}
      onChange={({ target }) => dispatch(setCurrentWaterAccount(target.value))}
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      {waterAccounts.map(wa => (
        <option key={wa.waterAccountId} value={wa.waterAccountId}>
          {wa.waterAccountId} - {wa.zoneString} - {wa.balance} ML
        </option>
      ))}
    </select>
  );
};
