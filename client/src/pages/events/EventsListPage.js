import React, { useEffect, useContext } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventSummaryCard from "./components/EventSummaryCard";
import { Link } from "react-router-dom";
import { EventsContext } from "./context";

const useStyles = makeStyles({
  cards: {
    display: "flex",
    flexWrap: "wrap",
  },
});

const EventList = () => {
  const classes = useStyles();
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
      {events && (
        <Container className={classes.cards}>
          {events.map((event) => (
            <EventSummaryCard key={event._id} event={event} />
          ))}
        </Container>
      )}
    </Container>
  );
};

export default EventList;
