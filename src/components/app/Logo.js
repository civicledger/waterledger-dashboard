import React from "react";
import waterLedgerLogo from "../../images/wl-logo.png";

const Logo = () => {
  return (
    <div className="flex-shrink flex m-5 mt-2">
      <div className="pt-2">
        <img src={waterLedgerLogo} alt="waterledger logo" className="logo-image" />
      </div>
    </div>
  );
};

export default Logo;
