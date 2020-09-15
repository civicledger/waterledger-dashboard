import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentWaterAccount } from "../../redux/actions/waterLicences";
import { formatKilolitres } from "../../utils/format";

const zones = ["Barron A", "Barron B", "Barron C", "Barron D", "Barron E"];

export default () => {
  const dispatch = useDispatch();

  const activeWaterAccount = useSelector(state => state.activeWaterAccount);
  const waterAccounts = useSelector(state => state.waterAccounts);

  return (
    <div className="table w-full text-sm">
      {waterAccounts.map(wa => (
        <div
          key={wa.waterAccountId}
          className={classNames(
            "table-row row-cell text-steel-100 hover:text-steel-200 cursor-pointer flex ",
            { "bg-steel-700": activeWaterAccount === wa.waterAccountId },
            { "": activeWaterAccount !== wa.waterAccountId }
          )}
          onClick={() => dispatch(setCurrentWaterAccount(wa.waterAccountId))}
        >
          <span className="table-cell text-left p-2">{wa.waterAccountId}</span>
          <span className="table-cell text-left p-2">{zones[wa.zoneIndex]}</span>
          <span className="table-cell text-left p-2">{formatKilolitres(wa.balance)}</span>
        </div>
      ))}
    </div>
  );
};
