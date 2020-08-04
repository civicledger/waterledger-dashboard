import React, { Fragment } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { setCurrentWaterAccount } from "../../redux/actions/waterLicences";

const zones = ["Barron A", "Barron B", "Barron C", "Barron D", "Barron E"];

const WaterAccountsList = ({ waterAccounts, setCurrentWaterAccount, activeWaterAccount, showId = false }) => {
  return (
    <div className="table w-full text-sm">
      {waterAccounts.map(wa => (
        <Fragment key={wa.waterAccountId}>
          <div
            className={classNames(
              "table-row row-cell text-steel-100 hover:text-steel-200 cursor-pointer flex ",
              { "bg-steel-700": activeWaterAccount === wa.waterAccountId },
              { "": activeWaterAccount !== wa.waterAccountId }
            )}
            onClick={() => setCurrentWaterAccount(wa.waterAccountId)}
          >
            <span className="table-cell text-left p-2">{wa.waterAccountId}</span>
            <span className="table-cell text-left p-2">{zones[wa.zoneIndex]}</span>
            <span className="table-cell text-left p-2">{wa.balance && `${wa.balance} ML`}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = ({ activeWaterAccount }) => ({ activeWaterAccount });

export default connect(mapStateToProps, { setCurrentWaterAccount })(WaterAccountsList);
