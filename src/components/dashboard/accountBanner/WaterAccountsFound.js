import React, { useState } from "react";
import classNames from "classnames";

import { formatKilolitres } from "../../../utils/format";

export default ({ waterAccounts, disableForm = false, position, claimLicences }) => {
  const [code, setCode] = useState("");

  const positionClass = classNames("w-1/2 p-5 absolute ab-box", {
    "position-1": position === 1,
    "position-2": position === 2,
    "position-3": position === 3,
    "position-4": position === 4,
  });

  const buttonClass = classNames("bg-sorange text-steel-white p-2 px-3 rounded-sm", {
    "bg-orange-800": disableForm,
  });

  const iconClass = classNames("fal mr-2 fa-fw", {
    "fa-check": !disableForm,
    "fa-ban": disableForm,
  });
  return (
    <div className={positionClass}>
      <h3 className="pb-3 text-2xl text-sorange font-semibold">Water Accounts Found</h3>

      <p>We have found the following water accounts</p>

      <div className="my-3 w-4/5 table">
        {waterAccounts.map(wa => (
          <div key={wa.id} className="table-row">
            <span className="table-cell p-1 text-left">{wa.waterAccount}</span>
            <span className="table-cell p-1 text-left">{wa.zone.name}</span>
            <span className="table-cell p-1 text-right">{formatKilolitres(wa.allocation)}</span>
          </div>
        ))}
      </div>
      <div>
        <input
          value={code}
          placeholder="Enter Security Code"
          disabled={disableForm}
          className="w-64 text-steel-900 mt-5 p-2 mr-5 rounded-sm"
          onChange={({ target }) => setCode(target.value)}
        />
        <button
          className={buttonClass}
          onClick={e => {
            e.preventDefault();
            claimLicences(code);
          }}
          disabled={disableForm}
        >
          <i className={iconClass}></i>
          Set Up Water Accounts
        </button>
      </div>
    </div>
  );
};
