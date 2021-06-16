import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="bg-steel-700 mb-10 rounded p-5">
      <h2 className="ml-2 pb-6">You are not logged in. Please login or sign up to start using Water Ledger dashboard.</h2>
      <div className="text-right">
        <Link to="/login">
          <button
            type="submit"
            className="py-2 px-4 font-medium rounded-sm bg-steel-200 hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500"
          >
            <i className="fal fa-sign-in mr-2"></i>Log In
          </button>
        </Link>
        <Link to="/signup">
          <button
            type="submit"
            className="py-2 px-4 font-medium rounded-sm bg-steel-200 hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 ml-4"
          >
            <i className="fal fa-user-plus mr-2"></i>Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};
