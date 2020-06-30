import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const moment = require("moment");

const useStyles = makeStyles({
  card: {
    margin: "10px",
    padding: "20px",
    width: "350px",
    flexDirection: "column",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});

const EventSummaryCard = ({ event, isHosting }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        title={moment(event.eventDateTime).format("MMMM Do, YYYY")}
        subheader={event.game.name}
      />
      <CardMedia
        className={classes.media}
        image={event.game.imageSrc}
        title={event.game.name}
      />
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
};

export default EventSummaryCard;
