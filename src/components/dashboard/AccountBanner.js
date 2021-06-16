import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="bg-steel-700 mb-8 rounded p-5 grid grid-cols-3">
      <h2 className="ml-2 col-span-2">
        You are not logged in. Please{" "}
        <Link to="/login" className="text-steel-300 hover:text-indigo-300">
          {" "}
          login{" "}
        </Link>
        or
        <Link to="/sign up" className="text-steel-300 hover:text-indigo-500">
          {" "}
          sign up{" "}
        </Link>
        to start using Water Ledger dashboard.
      </h2>
      <div className="text-right col-span-1">
        <Link to="/login" className="no-underline text-right mr-3 p-2 px-8 mt-5 border-steel-300 text-steel-300 rounded">
          <i className="fal fa-sign-in mr-2"></i>Log In
        </Link>
        <Link to="/signup" className="no-underline text-right mr-5 p-2 px-8 mt-5 border-steel-300 text-steel-300 rounded">
          <i className="fal fa-user-plus mr-2"></i>Sign Up
        </Link>
      </div>
    </div>
  );
};
