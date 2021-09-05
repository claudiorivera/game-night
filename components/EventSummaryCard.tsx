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
import { IEvent, IGame, IUser } from "types";

interface Props {
  event: IEvent;
  isHosting?: boolean;
}

export const EventSummaryCard = ({ event, isHosting }: Props) => {
  const game = event.eventGame as IGame;
  const host = event.eventHost as IUser;

  return (
    <Link href={`/events/${event._id}`} sx={{ textDecoration: "none" }}>
      <Card>
        <CardHeader
          title={moment(event.eventDateTime).format("MMMM Do, YYYY [at] h:mma")}
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
          <Typography variant="body2">
            Guests: {event.eventGuests.length}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
