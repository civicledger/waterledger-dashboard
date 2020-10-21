import React, { useState, useEffect } from "react";

import PageHeader from "../app/PageHeader";
import EventType from "./EventType";
import EventsList from "./EventsList";

import { serviceLoader } from "../../services/serviceLoader";
const orderBookService = serviceLoader("OrderBook");
const historyService = serviceLoader("OrderHistory");
const licencesService = serviceLoader("Licences");
const zonesService = serviceLoader("Zones");

export default () => {
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [contractTypes, setContractTypes] = useState({});
  const [sortTimeDirection, setSortTimeDirection] = useState("newFirst");
  const [activeEventTypes, setActiveEventTypes] = useState([]);
  const [allActive, setAllActive] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const obEvents = await orderBookService.getPastEvents();
      const historyEvents = await historyService.getPastEvents();
      const licencesEvents = await licencesService.getPastEvents();
      const zonesEvents = await zonesService.getPastEvents();
      const events = [...historyEvents, ...obEvents, ...licencesEvents, ...zonesEvents];

      const contractTypes = events.reduce((types, { contract, event }) => {
        if (!types[contract]) {
          types[contract] = [];
          types[contract].push(event);
        } else if (!types[contract].includes(event)) {
          types[contract].push(event);
        }
        return types;
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
      setEventTypes(eventTypes);
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

  const toggleAllEventsTypes = () => {
    if (allActive) {
      setActiveEventTypes([]);
    } else {
      setActiveEventTypes(eventTypes);
    }

    setAllActive(!allActive);
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

      <EventsList events={filteredEvents} sortTimeDirection={sortTimeDirection} changeTimeSort={changeTimeSort} />
    </div>
  );
};
