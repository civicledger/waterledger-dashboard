import React from "react";
import PageHeader from "../app/PageHeader";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="p-5 lg:p-10 flex-grow pb-5">
      <PageHeader header="Create a Water Ledger Trading Account" />

      <SignupForm />
    </div>
  );
};

export default Signup;
