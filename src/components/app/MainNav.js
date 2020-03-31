import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => <ul className="list-reset pl-5">
  <li>
    <NavLink to="/" exact className="main-nav">
      <i className="fal fa-chart-pie fa-fw mr-2 menu-icon"></i> Dashboard
    </NavLink>
    <NavLink to="/history" className="main-nav pb-0">
      <i className="fal fa-clipboard-list fa-fw mr-2 menu-icon"></i> Trade History
    </NavLink>
  </li>
</ul>