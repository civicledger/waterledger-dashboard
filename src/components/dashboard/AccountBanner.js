import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getSavedTerminologies } from "../queries";

const notLoggedInLayout = loggedIn => {
  if (loggedIn) return "";
  return (
    <>
      <div className="col-span-3 md:col-span-2 text-lg">
        <p className=" align-middle mb-3 lg:mb-0 lg:mt-2">
          You are not logged in. Please
          <Link to="/login" className="text-gray-500 hover:text-gray-600 mx-1">
            login
          </Link>
          or
          <Link to="/signup" className="text-gray-500 hover:text-gray-600 mx-1">
            sign up
          </Link>
          to start using Water Ledger dashboard.
        </p>
      </div>
      <div className="col-span-3 lg:col-span-1 flex grid grid-cols-2 gap-3">
        <Link to="/login" className="p-2 px-8 border-steel-300 text-steel-300 rounded hover:text-indigo-500 hover:border-indigo-500">
          <i className="fal fa-sign-in mr-2"></i>Log In
        </Link>
        <Link to="/signup" className="p-2 px-8 border-steel-300 text-steel-300 rounded hover:text-indigo-500 hover:border-indigo-500">
          <i className="fal fa-user-plus mr-2"></i>Sign Up
        </Link>
      </div>
    </>
  );
};

const pendingLayout = (pending, terminologies) => {
  if (!pending) return "";
  return (
    <div className="col-span-3 text-lg">
      <p className=" align-middle mb-3 lg:mb-0">
        <i className="fal fa-exclamation-triangle mr-2"></i>Your account is pending approval. You can access the full application but you cannot make
        trades until the {terminologies["licence"]} is approved.
      </p>
    </div>
  );
};

export default ({ loggedIn, pending }) => {
  const {
    data: { terminologies },
  } = useQuery("getTerminologies", getSavedTerminologies);
  if (loggedIn && !pending) return "";
  return (
    <>
      <div className="col-span-8 bg-steel-700 rounded p-5 grid grid-cols-3">
        {notLoggedInLayout(loggedIn)}
        {pendingLayout(pending, terminologies)}
      </div>
    </>
  );
};
