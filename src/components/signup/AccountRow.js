import React from "react";
import { formatKilolitres } from "../../utils/format";

const AccountRow = ({ account, zone }) => {
  return (
    <>
      <div>{account.waterAccount}</div>
      <div>{zone}</div>
      <div>{formatKilolitres(account.allocation)}</div>
    </>
  );
};

export default AccountRow;
