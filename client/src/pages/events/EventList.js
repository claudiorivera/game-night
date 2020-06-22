import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { EventSummaryCard } from "./";
import { Link } from "react-router-dom";

const axios = require("axios").default;

const useStyles = makeStyles({
  cards: {
    display: "flex",
    flexWrap: "wrap",
  },
});

const EventList = () => {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsFetching(true);
      const { data: events } = await axios.get("/api/events");
      setEvents(events);
      setIsFetching(false);
    };
    fetchEvents();
  }, []);

  return (
    <Container>
      <Link to={"/events/add"}>Add Event</Link>
      {!isFetching && (
        <Container className={classes.cards}>
          {events &&
            events.map((event) => (
              <EventSummaryCard key={event._id} event={event} />
            ))}
        </Container>
      )}
    </Container>
  );
};

export default EventList;
