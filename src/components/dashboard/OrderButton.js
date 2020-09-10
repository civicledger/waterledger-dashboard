import React from "react";

export default props => {
  const colour = props.type === "sell" ? "red" : "green";
  const buttonWord = props.type === "sell" ? "Offer" : "Bid";
  const buttonClass = `flex-1 border border-${colour}-500 text-${colour}-500 rounded mt-5 p-3 m-3 lg:m-0 cursor-pointer hover:border-${colour}-300`;
  const iconClass = `fal fa-plus-square text-${colour}-500 mr-3`;

  return (
    <div className={buttonClass} onClick={props.openOrderForm}>
      <i className={iconClass}></i> Place New {buttonWord}
    </div>
  );
};
