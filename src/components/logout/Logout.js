import React from "react";

import PageHeader from "../app/PageHeader";
import FormSuccess from "../common/form/FormSuccess";
import UserService from "../../services/UserService";

const Logout = () => {
  UserService.logOut();

  setTimeout(() => {
    window.location = "/";
  }, 3000);

  return (
    <div className="p-5 lg:p-10 flex-grow pb-5">
      <PageHeader header="Log out of your Water Ledger Trading Account" />

      <div className="m-10">
        <FormSuccess show={true}>
          You have been logged out of your water ledger trading account. Redirecting you to the Water Ledger dashboard.
        </FormSuccess>
      </div>
    </div>
  );
};

export default Logout;
