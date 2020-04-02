import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  return <div className="flex items-baseline mt-10 pb-5 border border-t-0 border-l-0 border-r-0">
    <h2 className="flex-grow text-2xl">Recent Trades</h2>
    { props.loading && <span className="flex-shrink mr-5 text-gray-500">Checking for updates
      <i className="fab fa-ethereum faa-flash ml-1 text-gray-500"></i>
    </span> }
    <Link to="/history" className="flex-shrink no-underline text-black text-right pt-4">
      See All <i className="fal fa-arrow-right fa-fw"></i>
    </Link>
  </div>;
}