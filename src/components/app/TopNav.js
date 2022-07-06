import React, { Fragment, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import { UserContext } from "../contexts";

import waterLedgerLogo from "../../images/wl-logo.png";
import { useQuery } from "react-query";
import { getSavedTerminologies } from "../queries";

const TopNav = () => {
  const [hideMenu, setHideMenu] = useState(true);
  const {
    login: { loggedIn },
  } = useContext(UserContext);

  const { data: terminologies } = useQuery("getTerminologies", getSavedTerminologies);

  const toggleMenu = () => setHideMenu(!hideMenu);

  return (
    <div className="flex flex-wrap items-center lg:hidden border border-gray-300 border-b-1 border-t-0 border-r-0 border-l-0 bg-steel-800">
      <div className="flex-shrink p-3">
        <img src={waterLedgerLogo} alt="Water Ledger logo" className="w-12 " />
      </div>
      <div className="flex-1 text-3xl text-white font-extralight uppercase">
        <span className="font-semibold">Water</span> Ledger
      </div>
      <div className="flex-shrink text-white">
        <div onClick={toggleMenu} className="p-2 pb-1 border border-steel-800 rounded mr-2">
          <i className={`text-2xl ${hideMenu ? "fal fa-bars" : "fal fa-times"}`} />
          {/* <i className="fal fa-bars text-2xl"></i> */}
        </div>
      </div>

      <ul className={classNames("list-reset text-center text-white w-full md:h-auto flex-column lg:flex", { hidden: hideMenu })}>
        <li>
          <NavLink className="top-nav" to="/" onClick={toggleMenu}>
            <i className="fal fa-chart-pie fa-fw menu-icon mr-2" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className="top-nav" to="/audit" onClick={toggleMenu}>
            <i className="fal fa-history fa-fw menu-icon mr-2" />
            Audit
          </NavLink>
        </li>
        <li>
          <NavLink className="top-nav" to="/history" onClick={toggleMenu}>
            <i className="fal fa-clipboard-list fa-fw menu-icon ml-2" />
            Trades
          </NavLink>
        </li>
        {loggedIn && (
          <Fragment>
            <li>
              <NavLink className="top-nav capitalize" to="/extractionRight" onClick={toggleMenu}>
                <i className="fal fa-user fa-fw menu-icon mr-2" />
                {terminologies["extractionRight"]} Details
              </NavLink>
            </li>
            <li>
              <NavLink className="top-nav" to="/liabilities" onClick={toggleMenu}>
                <i className="fal fa-file-invoice-dollar fa-fw menu-icon mr-2" />
                Liabilities
              </NavLink>
            </li>

            <li>
              <NavLink className="top-nav" to="/logout" onClick={toggleMenu}>
                <i className="fal fa-sign-out fa-fw  menu-icon mr-2" />
                Logout
              </NavLink>
            </li>
          </Fragment>
        )}

        {!loggedIn && (
          <Fragment>
            <li>
              <NavLink className="top-nav" to="/signup" onClick={toggleMenu}>
                <i className="fal fa-user-plus fa-fw  menu-icon mr-2" />
                Signup
              </NavLink>
            </li>

            <li>
              <NavLink className="top-nav" to="/login" onClick={toggleMenu}>
                <i className="fal fa-sign-in fa-fw menu-icon mr-2" />
                Log In
              </NavLink>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default TopNav;
