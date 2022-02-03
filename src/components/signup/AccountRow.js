import React from "react";
import { formatKilolitres } from "../../utils/format";

const AccountRow = ({ account, zone, unit }) => {
  return (
    <div>
      <div>{account.waterAccount}</div>
      <div>{zone}</div>
      <div>{formatKilolitres(account.allocation, unit)}</div>
    </div>
  );
};

export default AccountRow;
