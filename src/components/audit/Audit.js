import React, { useState, useEffect } from "react";

import PageHeader from "../app/PageHeader";
import EventType from "./EventType";
import EventsList from "./EventsList";

import { serviceLoader } from "../../services/serviceLoader";
const orderBookService = serviceLoader("OrderBook");
const historyService = serviceLoader("OrderHistory");
const licenceService = serviceLoader("Licences");

export default () => {
  const [events, setEvents] = useState([]);
  const [contractTypes, setContractTypes] = useState({});
  const [sortTimeDirection, setSortTimeDirection] = useState("newFirst");
  const [activeEventTypes, setActiveEventTypes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const obEvents = await orderBookService.getPastEvents();
      const historyEvents = await historyService.getPastEvents();
      const licenceEvents = await licenceService.getPastEvents();
      const events = [...historyEvents, ...obEvents, ...licenceEvents];

      const contractTypes = events.reduce((events, { contract, event }) => {
        if (!events[contract]) {
          events[contract] = [];
          events[contract].push(event);
        } else if (events[contract] !== event) {
          events[contract].push(event);
        }
        return events;
      }, {});
      setContractTypes(contractTypes);

      const eventTypes = events.reduce((types, { contract, event }) => {
        const contractEvent = `${contract}-${event}`;
        if (!types.includes(contractEvent)) {
          types.push(contractEvent);
        }
        return types;
      }, []);

      setActiveEventTypes(eventTypes);
      setEvents(events);
    };
    getData();
  }, []);

  const changeTimeSort = () => {
    const newSort = sortTimeDirection === "newFirst" ? "oldFirst" : "newFirst";
    setSortTimeDirection(newSort);
  };

  const toggleEventType = type => {
    if (!activeEventTypes.includes(type)) {
      setActiveEventTypes([...activeEventTypes, type]);
      return;
    }
    setActiveEventTypes(activeEventTypes.filter(et => et !== type).map(et => et));
  };

  events.sort((a, b) => {
    if (sortTimeDirection === "newFirst") {
      return b.time - a.time;
    }
    return a.time - b.time;
  });

  const filteredEvents = events.filter(({ contract, event }) => activeEventTypes.includes(`${contract}-${event}`));

  return (
    <div className="p-10 flex-grow pb-5">
      <PageHeader header="Audit Trail" />
      <div className="mb-10">
        {Object.keys(contractTypes).map((contract, key) => {
          return (
            <ul key={key}>
              <h3 className="text-xl mt-5 mb-2">{contract}</h3>
              {contractTypes[contract].map((et, key) => {
                const contractEvent = `${contract}-${et}`;
                return (
                  <EventType
                    key={key}
                    eventName={et}
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

      <EventsList events={filteredEvents} sortTimeDirection={sortTimeDirection} changeTimeSort={changeTimeSort} />
    </div>
  );
};
