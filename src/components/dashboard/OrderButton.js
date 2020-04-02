import React from 'react';

export default props => {
  const colour = props.type === 'sell' ? 'red' : 'green';
  const buttonWord = props.type === 'sell' ? 'Offer' : 'Bid';
  const buttonClass = `flex-1 mr-2 border border-${colour}-200 text-${colour}-500 rounded-sm mt-5 p-3 cursor-pointer hover:border-${colour}-400 hover:bg-${colour}-200`;
  const iconClass = `fal fa-plus-square text-${colour}-500 mr-3`;

  return <span className={buttonClass} onClick={props.openOrderForm}>
    <i className={iconClass}></i> Place New {buttonWord}
  </span>
}