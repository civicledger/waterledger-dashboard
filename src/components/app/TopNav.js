import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import waterLedgerLogo from '../../images/waterledger-logo.svg';

const TopNav = ({ethContext}) => {
  const [hideMenu, setHideMenu] = useState(true);

  const toggleMenu = () => setHideMenu(!hideMenu);

  return <div className="flex lg:hidden border border-gray-300 border-b-1 border-t-0 border-r-0 border-l-0 bg-white">
    <div className="flex-shrink py-1">
      <img src={waterLedgerLogo} alt="waterledger logo" className="logo-image" />
    </div>
    <div className="flex-1 mt-4 text-2xl civic"><span>Water</span> Ledger</div>
    <div className="flex-shrink text-right">

      <i className="fal fa-bars text-2xl m-5 mb-0 md:hidden" onClick={toggleMenu}></i>

      <ul className={classNames('list-reset md:flex md:h-auto flex-column lg:flex', {'hidden': hideMenu})}>
        <li className="mt-4 mr-3">
          <NavLink to="/" exact>Dashboard</NavLink>
        </li>
        { ethContext.address && <li className="mt-4 mr-3">
          <NavLink to="/licence">Licence Details</NavLink>
        </li> }
        <li className="mr-3 md:mr-5 mt-4 mb-5 md:mb-0">
          <NavLink to="/history">Trades</NavLink>
        </li>
      </ul>

    </div>

  </div>
}

const mapStateToProps = ({ethContext}) => ({ethContext});

export default connect(mapStateToProps)(TopNav);