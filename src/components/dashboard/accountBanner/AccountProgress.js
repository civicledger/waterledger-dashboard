import React from "react";
import { useSelector } from "react-redux";

export default props => {
  const progress = useSelector(state => state.accountProgress);
  let position = 0;

  if (props.waterAccounts.length > 0) position = 10;
  if (progress.claimSent) position = 15;
  if (progress.licenceAdded) position = 60;
  if (progress.licenceCompleted) position = 100;

  const dotStyle = { left: `${position}%` };
  return (
    <div className="bg-steel-800 h-1 relative mt-5">
      <span className="account-progress-dot p-1 px-2 absolute -mt-4 -ml-2 bg-green-500" style={dotStyle}>
        <i className="fal fa-check"></i>
      </span>

      <div className="pt-3 text-center">{progress.status}</div>
    </div>
  );
};
