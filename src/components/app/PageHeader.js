import React from "react";

const PageHeader = ({ header }) => {
  return (
    <div className="flex pb-3 lg:pb-5 border border-t-0 border-l-0 border-r-0">
      <h2 className="flex-grow text-xl lg:text-3xl">{header}</h2>
    </div>
  );
};

export default PageHeader;
