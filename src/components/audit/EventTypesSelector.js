import React, { useState } from "react";

import EventType from "./EventType";

export default ({ eventTypes, contractTypes, activeEventTypes, setActiveEventTypes }) => {
  const [allActive, setAllActive] = useState(true);
  const toggleEventType = type => {
    if (!activeEventTypes.includes(type)) {
      setActiveEventTypes([...activeEventTypes, type]);
      return;
    }
    setActiveEventTypes(activeEventTypes.filter(et => et !== type).map(et => et));
  };

  const toggleAllEventsTypes = () => {
    if (allActive) {
      setActiveEventTypes([]);
    } else {
      setActiveEventTypes(eventTypes);
    }

    setAllActive(!allActive);
  };

  return (
    <div className="mt-10 mb-10">
      <EventType eventName={"All Events"} isActive={allActive} toggle={toggleAllEventsTypes} />
      {Object.keys(contractTypes).map((contract, key) => {
        return (
          <ul key={key}>
            <h3 className="text-xl mt-5 mb-2">{contract}</h3>
            {contractTypes[contract].map((eventType, key) => {
              const contractEvent = `${contract}-${eventType}`;
              return (
                <EventType
                  key={key}
                  eventName={eventType}
                  type={contractEvent}
                  isActive={activeEventTypes.includes(contractEvent)}
                  toggle={toggleEventType}
                />
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};
