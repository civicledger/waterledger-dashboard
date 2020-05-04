import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

 const MainNav = ({ethContext, auth}) => <ul className="list-reset pl-5">
  <li>
    <NavLink to="/" exact className="main-nav">
      <i className="fal fa-chart-pie fa-fw mr-2 menu-icon"></i> Dashboard
    </NavLink>
    { ethContext.address && <NavLink to="/licence" className="main-nav pb-0">
      <i className="fal fa-user fa-fw mr-2 menu-icon"></i> Licence and User
    </NavLink> }
    <NavLink to="/history" className="main-nav pb-0">
      <i className="fal fa-clipboard-list fa-fw mr-2 menu-icon"></i> Trade History
    </NavLink>
    { auth && <NavLink to="/admin" className="main-nav pb-0">
      <i className="fal fa-users fa-fw mr-2 menu-icon"></i> User Admin
    </NavLink> }
  </li>
</ul>

const mapStateToProps = ({ethContext, auth}) => ({ethContext, auth});

export default connect(mapStateToProps)(MainNav);