import React from 'react';
import waterLedgerLogo from '../../images/waterledger-logo.svg';

const Logo = () => {
  return (<div className="flex-shrink flex m-5 mt-2">
    <div className="pt-2 w-1/5">
      <img src={waterLedgerLogo} alt="waterledger logo" className="logo-image" />
    </div>
    <div className="w-4/5 pt-5 text-2xl text-left civic">
      <span className="ml-3">Water</span> Ledger
    </div>
</div>);
}

export default Logo;