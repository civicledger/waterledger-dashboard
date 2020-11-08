import React from "react";
import classNames from "classnames";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";

import { getLicence } from "../queries";
import { setCurrentWaterAccount } from "../../redux/actions/waterLicences";
import { formatKilolitres } from "../../utils/format";

export default () => {
  const dispatch = useDispatch();
  const activeWaterAccount = useSelector(state => state.activeWaterAccount);
  const { data: licence } = useQuery("getLicence", getLicence, { keepPreviousData: true });

  if (!licence) {
    return (
      <div className="table w-full text-sm">
        <span className="table-cell text-center p-2">No Water Accounts Found</span>
      </div>
    );
  }

  return (
    <div className="table w-full text-sm">
      <h4 className="text-left mt-5 ml-2 font-semibold lg:font-normal lg:ml-0 lg:mt-0 lg:text-center">Your Water Accounts</h4>

      {licence.accounts.map((wa, index) => {
        wa.balance = wa.balance ?? 0;
        return (
          <div
            key={index}
            className={classNames(
              "table-row row-cell text-steel-100 hover:text-steel-200 cursor-pointer flex ",
              { "bg-steel-700": activeWaterAccount === wa.waterAccount },
              { "": activeWaterAccount !== wa.waterAccount }
            )}
            onClick={() => dispatch(setCurrentWaterAccount(wa.waterAccount))}
          >
            <span className="table-cell text-left p-2">{wa.waterAccount}</span>
            <span className="table-cell text-left p-2">{wa.zone.shortName}</span>
            <span className="table-cell text-left p-2">{formatKilolitres(wa.balance)}</span>
          </div>
        );
      })}
    </div>
  );
};
