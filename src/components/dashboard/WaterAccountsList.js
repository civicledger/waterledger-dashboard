import React, { useContext } from "react";
import classNames from "classnames";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { getExtractionRight, getSavedTerminologies } from "../queries";
import { UserContext, ACTIONS } from "../contexts";
import { setCurrentWaterAccount } from "../../redux/actions/waterExtractionRights";
import { formatKilolitres } from "../../utils/format";

export default () => {
  const { data: terminologies } = useQuery("getTerminologies", getSavedTerminologies);

  const dispatch = useDispatch();

  const { login, loginDispatch } = useContext(UserContext);
  if (!login.extractionRightId) return "";

  const { data: extractionRight } = useQuery("getExtractionRight", () => getExtractionRight(login.extractionRightId), { keepPreviousData: true });
  const isPending = extractionRight?.status === 1;

  if (!extractionRight) return "";
  return (
    <div>
      <h4 className="text-lg text-left ml-5 capitalize">{`Your ${terminologies["account"]}s`}</h4>
      <div className="table w-full text-sm p-4 pt-1">
        {extractionRight.accounts
          .sort((a, b) => {
            return a.level0Resource.identifier.localeCompare(b.level0Resource.identifier);
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
                  dispatch(setCurrentWaterAccount(wa.waterAccount, terminologies["account"]));
                }}
              >
                <span className="table-cell text-left p-2">{wa.waterAccount}</span>
                <span className="table-cell text-left p-2">{wa.level0Resource.shortName}</span>
                <span className="table-cell text-left p-2">{isPending ? "pending" : formatKilolitres(wa.balance, terminologies["unit"])}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};
