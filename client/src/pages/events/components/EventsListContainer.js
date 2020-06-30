import React from "react";
import EventSummaryCard from "./EventSummaryCard";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  cards: {
    display: "flex",
    flexWrap: "wrap",
  },
});

const EventsListContainer = ({ events, isHosting }) => {
  const classes = useStyles();
  return (
    <Container className={classes.cards}>
      {events.map((event) => (
        <Link
          key={event._id}
          to={`/events/${event._id}`}
          style={{ textDecoration: "none" }}
        >
          <EventSummaryCard event={event} isHosting={isHosting} />
        </Link>
      ))}
    </Container>
  );
};

export default EventsListContainer;
