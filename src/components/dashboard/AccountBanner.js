import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="bg-steel-700 mb-10 rounded p-5">
      <h2 className="ml-2 pb-6">You are not logged in. Please login or signup to start using Water Ledger dashboard.</h2>
      <div className="text-right col-span-3">
        <Link
          to="/login"
          type="submit"
          className="py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-steel-white bg-steel-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <i className="fal fa-sign-in mr-2"></i>Log In
        </Link>
        <Link
          to="/signup"
          type="submit"
          className="py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-steel-white bg-steel-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4"
        >
          <i className="fal fa-user-plus fa-fw mr-2"></i>Sign Up
        </Link>
      </div>
    </div>
  );
};
