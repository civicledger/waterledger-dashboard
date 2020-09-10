import React, { useState } from "react";
import Dropdown from './Dropdown';

export default ({events, eventTypes}) => {
  const [selected, setSelected] = useState("");

  return (
    <div>


      <div className="table w-full transaction-list mt-5 bg-steel-800 rounded p-5">

        <h2 className="text-2xl mb-3">Event Log</h2>
        <Dropdown
          label="Filter by Event Type"
          options={eventTypes}
          selected={selected}
          setSelected={setSelected}
        />
        <div className="table-row font-semibold bg-steel-700">
          <div className="table-cell p-2">Event Type</div>
          <div className="table-cell p-2">Event Id</div>
          <div className="table-cell p-2">Originator</div>
          <div className="table-cell p-2">Event values</div>
          <div className="table-cell p-2">Time</div>
        </div>

        {events.length === 0 && (
          <div className="table-row relative">
            <div className="row-cell table-cell"></div>
            <div className="row-cell table-cell"></div>
            <div className="row-cell table-cell text-center">No Events found</div>
            <div className="row-cell table-cell"></div>
            <div className="row-cell table-cell"></div>
            <div className="row-cell table-cell"></div>
          </div>
        )}

        {events.filter(event => event.event.includes(selected)).map(event => {
          return (
            <div className="table-row relative" key={event.id}>
              <div className="row-cell table-cell">{event.event}</div>
              <div className="row-cell table-cell">{event.id}</div>
              <div className="row-cell table-cell">{event.address}</div>
              <div className="row-cell table-cell">
                {
                  Object.keys(event.returnValues).map(key => {
                    if (!"0123456789".includes(key)) {
                      return(
                        <div key={key}> {key}: {event.returnValues[key]}</div>
                      );
                    }
                  })
                }
              </div>
              <div className="row-cell table-cell">{event.blockNumber}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
