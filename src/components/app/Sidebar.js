import React, { useState } from "react";

import Logo from "./Logo";
import MainNav from "./MainNav";

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="hidden lg:flex lg:w-40 bg-steel-800 open" id="menu">
      <div className="flex flex-col w-full">
        <a href="https://www.waterledger.com" className="no-underline">
          <Logo />
        </a>

        <div className="flex-shrink">
          <MainNav open={open} setOpen={setOpen} />
        </div>

        <div className="flex-1 p-5"></div>
        <div className="flex-shrink relative"></div>

        <div className="flex-shrink p-5 pt-0 text-center">
          <p className="text-steel-100">A Civic Ledger Solution</p>
        </div>
      </div>
    </div>
  );
};
