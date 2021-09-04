import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { IEvent, IGame, IUser } from "types";

const StyledCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%", // 16:9
});

const StyledLink = styled("a")({
  textDecoration: "none",
});

interface Props {
  event: IEvent;
  isHosting?: boolean;
}

export const EventSummaryCard = ({ event, isHosting }: Props) => {
  const game = event.eventGame as IGame;
  const host = event.eventHost as IUser;

  return (
    <Link href={`/events/${event._id}`} passHref>
      <StyledLink>
        <Card>
          <CardHeader
            title={moment(event.eventDateTime).format(
              "MMMM Do, YYYY [at] h:mma"
            )}
            subheader={game.name}
          />
          <StyledCardMedia image={game.imageSrc} title={game.name} />
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
      </StyledLink>
    </Link>
  );
};
