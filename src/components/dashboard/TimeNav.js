import React from 'react';


const TimeNav = (props) => {
  const periods = ['week', 'month', 'year'];
  const activeClasses = 'px-5 py-2 no-underline text-white rounded bg-blue-500';
  const classes = 'px-5 py-2 no-underline rounded text-gray-700 cursor-pointer';
  return (<div className="w-1/3">
    <div className="flex justify-between">
      {periods.map(period =>
      <div key={period}
        className={period === props.period ? activeClasses : classes}
        onClick={props.changePeriodAction.bind(props.context, period)}
          >
        {period.toUpperCase()}
      </div>
    )}
    </div>
  </div>);
}

export default TimeNav;