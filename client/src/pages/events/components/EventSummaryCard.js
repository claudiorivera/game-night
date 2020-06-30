import React, { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { EventsContext } from "../context";
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
  const { joinEventById } = useContext(EventsContext);
  const [disableJoinButton, setDisableJoinButton] = useState(false);
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          isHosting ? (
            <IconButton aria-label="settings">
              <EditIcon />
            </IconButton>
          ) : null
        }
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
      <CardActions>
        {!isHosting && (
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
        )}
      </CardActions>
    </Card>
  );
};

export default EventSummaryCard;
