import React from "react";
import classNames from "classnames";

export default ({ position }) => {
  const positionClass = classNames("w-1/2 p-5 mx-3 absolute flex ab-box", {
    "position-1": position === 1,
    "position-2": position === 2,
    "position-3": position === 3,
    "position-4": position === 4,
  });

  return (
    <div className={positionClass}>
      <div className="w-1/3">
        <div className="inline-block py-5 px-6 bg-steel-300 margin-auto mx-8 handbox">
          <i className="fal fa-hand-paper fa-3x"></i>
        </div>
      </div>
      <div className="w-2/3">
        <h3 className="pb-3 text-2xl text-sorange font-semibold">Hello!</h3>
        <p className="text-lg">
          We are keen to get your water account set up in one easy step. Here you can search for your water account. Once entered, Water Ledger will
          automatically confirm your details and give you access to your dashboard.
        </p>
      </div>
    </div>
  );
};
