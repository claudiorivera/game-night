import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const moment = require("moment");

const useStyles = makeStyles({
  card: {
    margin: "10px",
    padding: "20px",
    maxWidth: "500px",
  },
});
const EventSummaryCard = ({ event }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" color="textSecondary">
          {event.game.name}
        </Typography>
        <Typography variant="h4" gutterBottom>
          {moment(event.eventDate).format("MMMM Do, YYYY")}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Hosted by: {event.host.name}
        </Typography>
        <Typography variant="h6">Guests: {event.guests.length}</Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" color="primary">
          Join
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventSummaryCard;
