import React from 'react';
import { Logo, MainNav } from '../components';

export default () => <div className="hidden lg:flex lg:w-70 border border-gray-300 border-t-0 border-l-0 border-b-0 relative bg-white open" id="menu">
  <div className="flex flex-col w-full">
    <a href="https://www.waterledger.com" className="no-underline"><Logo /></a>

    <div className="flex-shrink p-5 pb-0"><MainNav /></div>

    <div className="flex-1 p-5"></div>

    <div className="flex-shrink p-5 pt-0 text-center">
      {/* <h3 className="text-gray-800 mb-2 heading">WATER ECOTECH</h3> */}
      <p className="text-gray-700">A Civic Ledger Solution</p>
    </div>
  </div>
</div>