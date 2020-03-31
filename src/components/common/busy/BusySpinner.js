import React from 'react';
import classNames from 'classnames';

const BusySpinner = ({ show }) => {

  return (
    <div className={classNames({"hidden": !show}, "text-grey", "p-10", "w-100", "text-center")}>
      <i className="fal fa-spinner fa-spin fa-5x"></i>
    </div>
  );
};

export default BusySpinner;