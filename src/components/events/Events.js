import React, { useEffect, useState } from "react";

import PageHeader from "../app/PageHeader";
import OrderBookService from "../../services/OrderBookService";
import OrderHistoryService from "../../services/OrderHistoryService";
import EventsList from "./EventsList";
const historyService = new OrderHistoryService();
const orderBookService = new OrderBookService();

export default props => {
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([""]);

  useEffect(() => {
    const getData = async () => {
    	const historyEvents = await historyService.getAllEvents();
    	const orderBookEvents = await orderBookService.getAllEvents();
    	setEventTypes(eventTypes =>
    		[...eventTypes, ...Object.keys(orderBookService.wrapper.abiObject.events)]);
    	setEventTypes(eventTypes =>
    		[...eventTypes, ...Object.keys(historyService.wrapper.abiObject.events)]);

    	orderBookEvents.allEvents({fromBlock: 0}).on('data', event => {
    		setEvents(events => [...events, event])
    	});

    	historyEvents.allEvents({fromBlock: 0}).on('data', event => {
    		setEvents(events => [...events, event])
    	})
    };
    getData();
  }, []);

  return (
    <div className="p-10 flex-grow pb-5">
      <PageHeader header="Audit Trail" />
      <EventsList events={events} eventTypes={[...new Set(eventTypes)]} />
    </div>
  );
};
