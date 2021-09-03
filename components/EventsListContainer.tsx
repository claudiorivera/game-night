import { Grid } from "@material-ui/core";
import { EventSummaryCard } from "components";
import React from "react";
import { IEvent } from "types";

interface Props {
  events: IEvent[];
  isHosting?: boolean;
  [props: string]: any;
}

export const EventsListContainer = ({ events, isHosting, ...props }: Props) => {
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
