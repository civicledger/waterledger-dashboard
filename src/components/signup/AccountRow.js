import React from "react";

const AccountRow = ({ account, zone }) => {
  return (
    <>
      <div>{account.waterAccount}</div>
      <div>{zone}</div>
      <div>{account.allocation}</div>
    </>
  );
};

export default AccountRow;
