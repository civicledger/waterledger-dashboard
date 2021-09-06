import React from "react";
import PageHeader from "../app/PageHeader";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="p-5 lg:p-10 flex-grow pb-5">
      <PageHeader header="Log In to your Water Ledger Trading Account" />
      <LoginForm />
    </div>
  );
};

export default Login;
