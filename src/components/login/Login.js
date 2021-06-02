import React from "react";
import PageHeader from "../app/PageHeader";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="lg:p-10 flex-grow">
      <PageHeader header="Log In to your Water Ledger Trading Account" />
      <LoginForm />
    </div>
  );
};

export default Login;
