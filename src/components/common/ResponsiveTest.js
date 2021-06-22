import React from "react";

const ResponsiveTest = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="visible sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden border p-2 px-3">extra small</div>
      <div className="hidden sm:inline-block md:hidden lg:hidden xl:hidden 2xl:hidden border p-2 px-3">small</div>
      <div className="hidden sm:hidden md:inline-block lg:hidden xl:hidden 2xl:hidden border p-2 px-3">medium</div>
      <div className="hidden sm:hidden md:hidden lg:inline-block xl:hidden 2xl:hidden border p-2 px-3">large</div>
      <div className="hidden sm:hidden md:hidden lg:hidden xl:inline-block 2xl:hidden border p-2 px-3">extra large</div>
      <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:inline-block border p-2 px-3">2x large</div>
    </div>
  );
};

export default ResponsiveTest;
