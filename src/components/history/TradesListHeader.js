import React from "react";
import { Link } from "react-router-dom";

export default (props) => {
  return (
    <div className="flex items-baseline mt-10 pb-5">
      <h2 className="flex-grow text-2xl">Recent Trades</h2>
      {props.loading && (
        <span className="flex-shrink mr-5 ">
          Checking for updates
          <i className="fab fa-ethereum faa-flash ml-1"></i>
        </span>
      )}
      {props.showLink && (
        <Link
          to="/history"
          className="flex-shrink no-underline text-black text-right pt-4"
        >
          See All <i className="fal fa-arrow-right fa-fw"></i>
        </Link>
      )}
    </div>
  );
};
