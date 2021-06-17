import React from "react";
import classNames from "classnames";

export default props => {
  const colour = props.type === "sell" ? "red" : "green";
  const buttonWord = props.type === "sell" ? "Offer" : "Bid";
  const defaultClasses = `w-full border border-${colour}-500 text-${colour}-500 rounded mt-5 p-3 m-3 lg:m-0 cursor-pointer hover:border-${colour}-300`;
  const buttonClass = classNames({ [defaultClasses]: true, "opacity-50": props.isPending });
  const defaultIconClasses = `fal  text-${colour}-500 mr-3`;
  const iconClass = classNames({ [defaultIconClasses]: true, "fa-plus-square": !props.isPending, "fa-ban": props.isPending });
  // const isPending = props.isPending;

  return (
    <button disabled={props.isPending} className={buttonClass} onClick={props.openOrderForm}>
      <i className={iconClass}></i> Place New {buttonWord}
    </button>
  );
};
