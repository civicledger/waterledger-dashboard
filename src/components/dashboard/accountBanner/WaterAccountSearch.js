import React, { useState } from "react";
import classNames from "classnames";

export default ({ getLicence, error, disableForm, position }) => {
  const [waId, setWaId] = useState("");

  const buttonClass = classNames("bg-sorange text-steel-100 p-2 px-3 rounded-sm", {
    "bg-orange-800": disableForm,
  });
  const iconClass = classNames("fal mr-2 fa-fw", {
    "fa-search": !disableForm,
    "fa-ban": disableForm,
  });

  const positionClass = classNames("w-1/2 p-5 absolute ab-box", {
    "position-1": position === 1,
    "position-2": position === 2,
    "position-3": position === 3,
    "position-4": position === 4,
  });

  return (
    <div className={positionClass}>
      <h3 className="pb-3 text-2xl text-sorange font-semibold">Enter a Water Account</h3>

      <p>Enter one of your water accounts to confirm your identity and enable access to Water Ledger.</p>

      <form className="text-center">
        {error.length > 0 && (
          <div className="text-sm p-3 inline-block">
            <span className="pr-2 text-sorange font-semibold">Error</span>
            {error}
          </div>
        )}
        <input
          className="w-64 text-steel-900 mt-5 p-2 mr-5 rounded-sm"
          placeholder="Enter a Water Account Id"
          value={waId}
          disabled={disableForm}
          onChange={({ target }) => setWaId(target.value)}
        />
        <button
          className={buttonClass}
          onClick={e => {
            e.preventDefault();
            getLicence(waId);
          }}
          disabled={disableForm}
        >
          <i className={iconClass}></i>
          Find Water Accounts
        </button>
      </form>
    </div>
  );
};
