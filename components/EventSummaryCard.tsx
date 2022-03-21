import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "components";
import moment from "moment";
import React from "react";
import { PopulatedEvent } from "types";

type EventSummaryCardProps = {
  event: PopulatedEvent;
  isHosting?: boolean;
};

export const EventSummaryCard = ({
  event,
  isHosting,
}: EventSummaryCardProps) => {
  const { game, host } = event;

  return (
    <Link href={`/events/${event.id}`} sx={{ textDecoration: "none" }}>
      <Card>
        <CardHeader
          title={moment(event.dateTime).format("MMMM Do, YYYY [at] h:mma")}
          subheader={game.name}
        />
        <CardMedia
          image={game.imageSrc}
          title={game.name}
          sx={{
            height: 0,
            paddingTop: "56.25%", // 16:9
          }}
        />
        <CardContent>
          {!isHosting && (
            <Typography variant="body1" color="textSecondary">
              Hosted by: {host.name}
            </Typography>
          )}
          <Typography variant="body2">Guests: {event.guests.length}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
