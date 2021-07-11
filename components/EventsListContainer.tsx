import EventSummaryCard from "@components/EventSummaryCard";
import { Grid } from "@material-ui/core";
import { Event } from "@models/Event";
import React from "react";

interface Props {
  events: Event[];
  isHosting?: boolean;
  [props: string]: any;
}

const EventsListContainer = ({ events, isHosting, ...props }: Props) => {
  return (
    <Grid container spacing={2} {...props}>
      {events.map((event) => (
        <Grid item key={String(event._id)} xs={12} sm={6} md={3}>
          <EventSummaryCard event={event} isHosting={isHosting} />
        </Grid>
      ))}
    </Grid>
  );
};
export default EventsListContainer;
