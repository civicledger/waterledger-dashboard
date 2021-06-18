import React, { useContext } from "react";
import classNames from "classnames";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { getLicence } from "../queries";
import { UserContext, ACTIONS } from "../contexts";
import { setCurrentWaterAccount } from "../../redux/actions/waterLicences";
import { formatKilolitres } from "../../utils/format";

export default () => {
  const dispatch = useDispatch();

  const { login, loginDispatch } = useContext(UserContext);
  if (!login.licenceId) return "";

  const { data: licence } = useQuery(["getLicence", login.licenceId], () => getLicence(login.licenceId), { keepPreviousData: true });
  const isPending = licence?.status === 1;

  if (!licence) {
    return (
      <div className="table w-full text-sm">
        <span className="table-cell text-center p-2">No Water Accounts Found</span>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-lg text-left ml-5">Your Water Accounts</h4>
      <div className="table w-full text-sm p-4 pt-1">
        {licence.accounts
          .sort((a, b) => {
            return a.zone.zoneIndex - b.zone.zoneIndex;
          })
          .map((wa, index) => {
            wa.balance = wa.balance ?? 0;
            return (
              <div
                key={index}
                className={classNames(
                  "table-row row-cell text-steel-100 hover:text-steel-200 cursor-pointer flex ",
                  { "bg-steel-700": login.activeWaterAccount === wa.id },
                  { "": login.activeWaterAccount !== wa.id }
                )}
                onClick={() => {
                  loginDispatch({ type: ACTIONS.SET_ACTIVE_WATER_ACCOUNT, payload: wa.id });
                  dispatch(setCurrentWaterAccount(wa.waterAccount));
                }}
              >
                <span className="table-cell text-left p-2">{wa.waterAccount}</span>
                <span className="table-cell text-left p-2">{wa.zone.shortName}</span>
                <span className="table-cell text-left p-2">{isPending ? "pending" : formatKilolitres(wa.balance)}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};
