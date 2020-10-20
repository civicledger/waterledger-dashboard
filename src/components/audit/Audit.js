import React, { useState, useEffect } from "react";

import PageHeader from "../app/PageHeader";
import EventType from "./EventType";
import EventsList from "./EventsList";

import { serviceLoader } from "../../services/serviceLoader";
const orderBookService = serviceLoader("OrderBook");
const historyService = serviceLoader("OrderHistory");
const licenceService = serviceLoader("Licences");

export default props => {
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [contractTypes, setContractTypes] = useState({});
  const [sortTimeDirection, setSortTimeDirection] = useState("newFirst");
  const [activeEventTypes, setActiveEventTypes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const obEvents = await orderBookService.getPastEvents();
      const historyEvents = await historyService.getPastEvents();
      const licenceEvents = await licenceService.getPastEvents();
      const events = [...historyEvents, ...obEvents, ...licenceEvents];

      let contractTypes = {};
      events.map(e => {
        if (!contractTypes[e.contract]) {
          contractTypes[e.contract] = [];
          contractTypes[e.contract].push(e.event);
        } else if (contractTypes[e.contract] !== e.event) {
          contractTypes[e.contract].push(e.event);
        }
      });
      setContractTypes(contractTypes);
      const eventTypes = events.reduce((types, { event }) => {
        if (!types.includes(event)) {
          types.push(event);
        }
        return types;
      }, []);
      eventTypes.sort((a, b) => a.localeCompare(b));
      setEventTypes(eventTypes);
      console.log(eventTypes);
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

  const filteredEvents = events.filter(({ event }) => activeEventTypes.includes(event));

  return (
    <div className="p-10 flex-grow pb-5">
      <PageHeader header="Audit Trail" />

      <h3 className="mt-5 mb-2">Available Events</h3>
      {Object.keys(contractTypes).map((contract, key) => {
        return (
          <ul key={key}>
            <h1>{contract}</h1>
            {contractTypes[contract].map((et, key) => {
              return <EventType key={key} type={et} isActive={activeEventTypes.includes(et)} toggle={toggleEventType} />;
            })}
          </ul>
        );
      })}

      <EventsList events={filteredEvents} sortTimeDirection={sortTimeDirection} changeTimeSort={changeTimeSort} />
    </div>
  );
};
