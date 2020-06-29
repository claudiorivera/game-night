import React from "react";
import EventSummaryCard from "./EventSummaryCard";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cards: {
    display: "flex",
    flexWrap: "wrap",
  },
});

const EventsListContainer = ({ events }) => {
  const classes = useStyles();
  return (
    <Container className={classes.cards}>
      {events.map((event) => (
        <EventSummaryCard key={event._id} event={event} />
      ))}
    </Container>
  );
};

export default EventsListContainer;
