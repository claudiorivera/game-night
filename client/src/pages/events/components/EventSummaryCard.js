import React, { useContext, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { EventsContext } from "../context";
const moment = require("moment");

const useStyles = makeStyles({
  card: {
    margin: "10px",
    padding: "20px",
    width: "400px",
    flexDirection: "column",
  },
});

const EventSummaryCard = ({ event }) => {
  const { joinEventById } = useContext(EventsContext);
  const [disableJoinButton, setDisableJoinButton] = useState(false);
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" color="textSecondary">
          {event.game.name}
        </Typography>
        <Typography variant="h4" gutterBottom>
          {moment(event.eventDateTime).format("MMMM Do, YYYY")}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Hosted by: {event.host.name}
        </Typography>
        <Typography variant="h6">Guests: {event.guests.length}</Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={disableJoinButton}
          onClick={async () => {
            await joinEventById(event._id);
            setDisableJoinButton(true);
          }}
        >
          Join
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventSummaryCard;
