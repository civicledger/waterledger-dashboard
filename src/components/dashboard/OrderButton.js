import React, { useContext } from "react";
import classNames from "classnames";
import { UserContext } from "../contexts";
import { useDispatch } from "react-redux";

import { openOrderForm } from "../../redux/actions/orders";

export default ({ isPending, type }) => {
  const {
    login: { loggedIn },
  } = useContext(UserContext);

  const dispatch = useDispatch();

  if (!loggedIn) return "";

  const colour = type === "sell" ? "red" : "green";
  const buttonWord = type === "sell" ? "Offer" : "Bid";
  const defaultClasses = `w-full border border-${colour}-500 text-${colour}-500 rounded mt-5 p-3 m-3 lg:m-0 cursor-pointer hover:border-${colour}-300`;
  const buttonClass = classNames({ [defaultClasses]: true, "opacity-50": isPending });
  const defaultIconClasses = `fal  text-${colour}-500 mr-3`;
  const iconClass = classNames({ [defaultIconClasses]: true, "fa-plus-square": !isPending, "fa-ban": isPending });

  return (
    <button disabled={isPending} className={buttonClass} onClick={() => dispatch(openOrderForm({ type, price: "", quantity: "" }))}>
      <i className={iconClass}></i> Place New {buttonWord}
    </button>
  );
};
