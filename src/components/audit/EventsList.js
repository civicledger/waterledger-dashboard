import React, { Fragment } from "react";
import Web3 from "web3";
import classNames from "classnames";

import { formatShortDateObject, formatShortTimeObject } from "../../utils/format";
import { getCurrentNetwork } from "../../utils/ethUtils";
import { formatKilolitres } from "../../utils/format";

const web3 = new Web3();

export default ({ events, sortTimeDirection, changeTimeSort }) => {
  const timeIconClass = classNames("ml-2 fal absolute right-0", {
    "fa-caret-down": sortTimeDirection === "newFirst",
    "fa-caret-up": sortTimeDirection !== "newFirst",
  });

  return (
    <div className="transaction-list mt-5 bg-steel-800 rounded p-5">
      <h2 className="text-2xl mb-3">Event Log</h2>

      <div className="overflow-x-auto">
        <table className="table-fixed w-full">
          <thead className="bg-steel-700">
            <tr>
              <th className="p-3 text-left">Event Type</th>
              {/* <th className="p-2">Event Id</div> */}
              <th className="p-3 text-left">Contract</th>
              <th className="p-3 text-left">Originator</th>
              <th className="p-3 text-left w-2/6">Event values</th>
              <th className="p-3 text-left cursor-pointer relative w-1/6" onClick={() => changeTimeSort()}>
                Time <i className={timeIconClass}></i>
              </th>
              <th className=" w-1/12">Verify</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center font-lg pt-3">
                  <i className="fal fa-spinner fa-spin mr-3"></i> Loading events...
                </td>
              </tr>
            )}

            {events.map((event, index) => {
              return (
                <tr key={index}>
                  <td className="p-3 align-top">{event.event}</td>
                  {/* <td className="row-cell table-cell">{event.transactionHash}</td> */}
                  <td className="p-3 align-top">{event.contract}</td>
                  <td className="p-3 align-top">
                    <a href={`http://${getCurrentNetwork()}.etherscan.io/address/${event.address}`}>
                      <i className="fal fa-user" title={event.address}></i> View on Etherscan
                    </a>
                  </td>
                  <td className="p-3 align-top">
                    <dl className="flex flex-wrap text-xs">
                      {event.returnValues.map(({ key, value }) => (
                        <Fragment key={key}>
                          <dt className="w-1/5 pb-1">{key}</dt>
                          <dd className="w-4/5 pb-1 truncate">{formatValue(key, value)}</dd>
                        </Fragment>
                      ))}
                    </dl>
                  </td>
                  <td className="p-3 align-top">
                    {formatShortDateObject(event.time)} @ {formatShortTimeObject(event.time)}
                  </td>
                  <td className="p-3 align-top text-right">
                    <a href={`http://${getCurrentNetwork()}.etherscan.io/tx/${event.transactionHash}`}>
                      <i className="fal fa-external-link" title={event.transactionHash}></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const formatValue = (key, value) => {
  if (key === "waterAccountIds") {
    return value.map(waid => web3.utils.hexToAscii(waid)).join(", ");
  }

  if (key === "balances") {
    return value.map(balance => formatKilolitres(balance)).join(", ");
  }

  if (key === "balance" || key === "quantity") {
    return formatKilolitres(value);
  }

  if (key === "price") {
    return `$${value}`;
  }

  if (key === "id" || key === "orderId") return value;

  if (web3.utils.isAddress(value)) {
    if (!Number(value)) return "No Address";
    return value;
  }
  if (web3.utils.isHexStrict(value)) {
    return web3.utils.hexToAscii(value);
  }

  return value;
};
