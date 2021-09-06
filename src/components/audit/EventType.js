import React from "react";
import classNames from "classnames";

export default ({ type, isActive, toggle, eventName }) => {
  const iconClass = classNames("mr-1 fal", { "fa-check-circle": isActive, "fa-circle": !isActive });
  const itemClass = classNames("py-2 px-3 m-1 inline-block cursor-pointer", {
    "bg-steel-700 text-steel-100": isActive,
    "bg-steel-600 text-steel-500": !isActive,
  });
  return (
    <li className={itemClass} onClick={() => toggle(type)}>
      <i className={iconClass}></i>
      {eventName}
    </li>
  );
};
