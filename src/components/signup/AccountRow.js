import React from "react";
import { formatKilolitres } from "../../utils/format";

const AccountRow = ({ account, level0Resource, unit }) => {
  return (
    <>
      <div>{account.waterAccount}</div>
      <div>{level0Resource}</div>
      <div>{formatKilolitres(account.allocation, unit)}</div>
    </>
  );
};

export default AccountRow;
