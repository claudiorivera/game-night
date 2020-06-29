import React, { useEffect, useContext } from "react";
import { Container } from "@material-ui/core";
import EventsListContainer from "./components/EventsListContainer";
import { Link } from "react-router-dom";
import { EventsContext } from "./context";

const EventList = () => {
  const { getAllEvents, events } = useContext(EventsContext);

  useEffect(() => {
    const fetchEvents = async () => {
      await getAllEvents();
    };
    fetchEvents();
    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Link to={"/events/add"}>Add Event</Link>
      {events && <EventsListContainer events={events} />}
    </Container>
  );
};

export default EventList;
