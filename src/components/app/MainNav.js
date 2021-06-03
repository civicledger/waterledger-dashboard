import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts";

const MainNav = () => {
  const {
    login: { loggedIn },
  } = useContext(UserContext);

  return (
    <ul className="list-reset text-center">
      <li>
        <NavLink to="/" exact className="main-nav">
          <i className="fal fa-chart-pie fa-fw menu-icon"></i>
          <div className="text-xs">DASHBOARD</div>
        </NavLink>
      </li>
      {loggedIn && (
        <Fragment>
          <li>
            <NavLink to="/licence" className="main-nav pb-0">
              <i className="fal fa-user fa-fw menu-icon"></i>
              <div className="text-xs">LICENCE</div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/liabilities" className="main-nav pb-0">
              <i className="fal fa-file-invoice-dollar fa-fw menu-icon"></i>
              <div className="text-xs">LIABILITIES</div>
            </NavLink>
          </li>
        </Fragment>
      )}

      {!loggedIn && (
        <>
          <li>
            <NavLink to="/signup" className="main-nav pb-0">
              <i className="fal fa-user-plus fa-fw menu-icon"></i>
              <div className="text-xs">SIGNUP</div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/login" className="main-nav text-steel-100 pb-0">
              <i className="fal fa-sign-in fa-fw menu-icon"></i>
              <div className="text-xs">LOG IN</div>
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to="/history" className="main-nav text-steel-100 pb-0">
          <i className="fal fa-clipboard-list fa-fw menu-icon"></i>
          <div className="text-xs">TRADES</div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/audit" className="main-nav text-steel-100 pb-0">
          <i className="fal fa-history fa-fw menu-icon"></i>
          <div className="text-xs">AUDIT</div>
        </NavLink>
      </li>

      {loggedIn && (
        <Fragment>
          <li>
            <i className="fal fa-ellipsis-h text-steel-100 text-3xl mb-3"></i>
          </li>
          <li>
            <NavLink to="/notifications" className="main-nav pb-0">
              <i className="fal fa-bell fa-fw menu-icon"></i>
              <div className="text-xs">NOTIFICATIONS</div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/logout" className="main-nav pb-0">
              <i className="fal fa-sign-out fa-fw menu-icon"></i>
              <div className="text-xs">LOG OUT</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="main-nav pb-0">
              <i className="fal fa-cogs fa-fw menu-icon"></i>
              <div className="text-xs">SETTINGS</div>
            </NavLink>
          </li>
          <li className="text-center">
            <i className="fal fa-ellipsis-h text-steel-200 text-3xl mb-3"></i>
          </li>
          <li>
            <NavLink to="/support" className="main-nav pb-0">
              <i className="fal fa-question-circle fa-fw menu-icon"></i>
              <div className="text-xs">SUPPORT</div>
            </NavLink>
          </li>
        </Fragment>
      )}
    </ul>
  );
};

export default MainNav;
