import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import moment from "moment";
import Link from "next/link";
import React from "react";

const StyledCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%", // 16:9
});

const StyledLink = styled("a")({
  textDecoration: "none",
});

const EventSummaryCard = ({ event, isHosting }) => (
  <Link href={`/events/${event._id}`} passHref>
    <StyledLink>
      <Card>
        <CardHeader
          title={moment(event.eventDateTime).format("MMMM Do, YYYY [at] h:mma")}
          subheader={event.eventGame.name}
        />
        <StyledCardMedia
          image={event.eventGame.imageSrc}
          title={event.eventGame.name}
        />
        <CardContent>
          {!isHosting && (
            <Typography variant="body1" color="textSecondary">
              Hosted by: {event.eventHost.name}
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

export default EventSummaryCard;
