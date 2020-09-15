import React, { Fragment } from "react";
import classNames from "classnames";

import { formatShortDateObject, formatShortTimeObject } from "../../utils/format";
import { getCurrentNetwork } from "../../utils/ethUtils";

export default ({ events, sortTimeDirection, changeTimeSort }) => {
  const timeIconClass = classNames("ml-2 fal absolute right-0", {
    "fa-caret-down": sortTimeDirection === "newFirst",
    "fa-caret-up": sortTimeDirection !== "newFirst",
  });

  return (
    <div className="table w-full transaction-list mt-5 bg-steel-800 rounded p-5">
      <h2 className="text-2xl mb-3">Event Log</h2>

      <table className="table w-full">
        <thead className=" bg-steel-700">
          <tr>
            <th className="p-3 text-left">Event Type</th>
            {/* <th className="p-2">Event Id</div> */}
            <th className="p-3 text-left">Contract</th>
            <th className="p-3 text-left">Originator</th>
            <th className="p-3 text-left w-2/6">Event values</th>
            <th className="p-3 text-left cursor-pointer relative w-1/6" onClick={() => changeTimeSort()}>
              Time <i className={timeIconClass}></i>
            </th>
            <th className=" w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center pt-3">
                No Events found
              </td>
            </tr>
          )}

          {events.map(event => {
            return (
              <tr key={event.transactionHash}>
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
                        <dd className="w-4/5 pb-1">{value}</dd>
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
  );
};
