import React, { Fragment } from "react";
import { formatAmount } from "../../utils/format";

export default ({ scheme }) => (
  <Fragment>
    <div className="inline-flex flex-grow align-middle">
      <div className="summary-icon-box xl:block">
        <i className="fal fa-chart-area text-3xl fa-fw"></i>
      </div>

      <div className="flex-1 flex flex-col mr-10">
        <div className="flex-1 text-4xl font-light -mt-2">
          {formatAmount(scheme.lastTradePrice)}
        </div>
        <div className="flex-1 text-sm text-gray-600 -mt-2">
          Last Traded Price
        </div>
      </div>
    </div>
  </Fragment>
);
