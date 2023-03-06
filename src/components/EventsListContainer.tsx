import { Grid } from "@mui/material";

import { EventSummaryCard } from "~/components";
import { PopulatedEvent } from "~/types";

type EventsListContainerProps = {
  events: PopulatedEvent[];
  isHosting?: boolean;
  [props: string]: any;
};

export const EventsListContainer = ({
  events,
  isHosting,
  ...props
}: EventsListContainerProps) => {
  return (
    <Grid container spacing={2} {...props}>
      {events.map((event) => (
        <Grid item key={event.id} xs={12} sm={6} md={3}>
          <EventSummaryCard event={event} isHosting={isHosting} />
        </Grid>
      ))}
    </Grid>
  );
};
