import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import moment from "moment";
import React from "react";

const StyledLink = styled("a")({
  textDecoration: "none",
});

const StyledCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%", // 16:9
});

const EventCard = ({ event, isHosting }) => (
  <Card>
    <CardHeader
      title={moment(event.eventDateTime).format("MMMM Do, YYYY [at] h:mma")}
      subheader={event.game.name}
    />
    <StyledCardMedia image={event.game.imageSrc} title={event.game.name} />
    <CardContent>
      {!isHosting && (
        <Typography variant="body1" color="textSecondary">
          Hosted by: {event.host.name}
        </Typography>
      )}
      <Typography variant="body2">Guests: {event.guests.length}</Typography>
    </CardContent>
  </Card>
);

const EventSummaryCard = React.forwardRef(({ href, ...otherProps }, ref) => {
  return (
    <StyledLink href={href} ref={ref}>
      <EventCard {...otherProps} />
    </StyledLink>
  );
});

export default EventSummaryCard;
