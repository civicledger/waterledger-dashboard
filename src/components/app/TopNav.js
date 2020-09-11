import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import waterLedgerLogo from "../../images/waterledger-logo.svg";

const TopNav = ({ ethContext }) => {
  const [hideMenu, setHideMenu] = useState(true);

  const toggleMenu = () => setHideMenu(!hideMenu);

  return (
    <div className="flex flex-wrap items-center lg:hidden border border-gray-300 border-b-1 border-t-0 border-r-0 border-l-0 bg-white">
      <div className="flex-shrink p-3">
        <img src={waterLedgerLogo} alt="Water Ledger logo" className="w-12 " />
      </div>
      <div className="flex-1 text-3xl civic">
        <span>Water</span> Ledger
      </div>
      <div className="flex-shrink text-steel-800">
        <div onClick={toggleMenu} className="p-2 pb-1 border border-steel-800 rounded mr-2">
          <i className="fal fa-bars text-2xl"></i>
        </div>
      </div>

      <ul className={classNames("list-reset md:flex text-right text-steel-900 w-full md:h-auto flex-column lg:flex", { hidden: hideMenu })}>
        <li className="mr-3">
          <NavLink to="/" exact onClick={toggleMenu}>
            Dashboard
            <i className="fal fa-chart-pie fa-fw menu-icon"></i>
          </NavLink>
        </li>
        {ethContext.address && (
          <Fragment>
            <li className="mt-4 mr-3">
              <NavLink to="/licence" onClick={toggleMenu}>
                Licence Details
                <i className="fal fa-user fa-fw menu-icon"></i>
              </NavLink>
            </li>
            <li className="mt-4 mr-3">
              <NavLink to="/liabilities" onClick={toggleMenu}>
                Liabilities
                <i className="fal fa-file-invoice-dollar fa-fw menu-icon"></i>
              </NavLink>
            </li>
          </Fragment>
        )}
        <li className="mr-3 md:mr-5 mt-4 mb-3 md:mb-0">
          <NavLink to="/history" onClick={toggleMenu}>
            Trades
            <i className="fal fa-clipboard-list fa-fw menu-icon"></i>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = ({ ethContext }) => ({ ethContext });

export default connect(mapStateToProps)(TopNav);
