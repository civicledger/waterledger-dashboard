import React from "react";
import classNames from "classnames";

const notificationIcon = type => {
  switch (type) {
    case "success":
      return (
        <span className="text-green-500 p-3">
          <i className="fal fa-check-circle fa-fw fa-lg"></i>
        </span>
      );
    case "error":
      return (
        <span className="text-red-500 p-3">
          <i className="fal fa-times-octagon fa-fw fa-lg"></i>
        </span>
      );
    default:
      return (
        <span className="text-blue-500 p-3">
          <i className="fal fa-exclamation-circle fa-fw fa-lg"></i>
        </span>
      );
  }
};

const notificationItem = ({ id, type = "info", text }) => {
  const classes = classNames("lg:inline-flex mt-3 p-3 shadow bg-steel-700 rounded border", {
    "border-green-500": type === "success",
    "border-blue-500": type === "info",
    "border-red-500": type === "error",
  });
  return (
    <li className={classes} key={id}>
      {notificationIcon(type)}
      <span className="p-3">{text}</span>
    </li>
  );
};

const Notifications = ({ notifications }) => {
  if (!notifications.length) return "";

  return <ul className="inline-flex flex-col absolute right-0 mr-5 mt-16 mb-5 items-end notifications">{notifications.map(notificationItem)}</ul>;
};

export default Notifications;
