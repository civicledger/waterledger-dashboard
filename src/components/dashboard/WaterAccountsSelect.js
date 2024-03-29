import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentWaterAccount } from "../../redux/actions/waterExtractionRights";

const WaterAccountsSelect = () => {
  const dispatch = useDispatch();

  const activeWaterAccount = useSelector(state => state.activeWaterAccount);
  const waterAccounts = useSelector(state => state.waterAccounts);

  return (
    <select
      value={activeWaterAccount}
      onChange={({ target }) => dispatch(setCurrentWaterAccount(target.value))}
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring"
    >
      {waterAccounts.map(wa => (
        <option key={wa.waterAccount} value={wa.waterAccount}>
          {wa.waterAccount} - {wa.level0ResourceString} - {wa.balance} ML
        </option>
      ))}
    </select>
  );
};
