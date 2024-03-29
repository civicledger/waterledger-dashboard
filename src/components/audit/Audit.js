import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import PageHeader from "../app/PageHeader";
import EventsList from "./EventsList";
import EventTypesSelector from "./EventTypesSelector";
import AuditService from "../../services/AuditService";
import { getLevel1Resource } from "../queries";

export default () => {
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [contractTypes, setContractTypes] = useState({});
  const [sortTimeDirection, setSortTimeDirection] = useState("newFirst");
  const [activeEventTypes, setActiveEventTypes] = useState([]);

  const { data: level1Resource } = useQuery("getLevel1Resource", getLevel1Resource, { keepPreviousData: true });

  useEffect(() => {
    const getData = async () => {
      if (!level1Resource || level1Resource.platform !== 1) return;
      const auditService = new AuditService(level1Resource);
      if (!auditService.orderbookInstance) return;
      const events = await auditService.getOrderbookPastEvents();

      const contractTypes = events.reduce((types, { contract, event }) => {
        if (!types[contract]) types[contract] = [];
        if (types[contract].includes(event)) return types;
        types[contract].push(event);
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
  }, [level1Resource]);

  const changeTimeSort = () => {
    const newSort = sortTimeDirection === "newFirst" ? "oldFirst" : "newFirst";
    setSortTimeDirection(newSort);
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
      <EventTypesSelector
        eventTypes={eventTypes}
        setActiveEventTypes={setActiveEventTypes}
        contractTypes={contractTypes}
        activeEventTypes={activeEventTypes}
      />
      <EventsList events={filteredEvents} sortTimeDirection={sortTimeDirection} changeTimeSort={changeTimeSort} />
    </div>
  );
};
