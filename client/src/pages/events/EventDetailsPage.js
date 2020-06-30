import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import GameDetails from "../games/components/GameDetails";

const axios = require("axios").default;
const moment = require("moment");

const useStyles = makeStyles({
  card: {
    margin: "10px",
    padding: "20px",
    flexDirection: "column",
  },
});

const EventDetailsPage = () => {
  const classes = useStyles();
  const { eventId } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEventById = async (id) => {
      const { data } = await axios.get(`/api/events/${id}`);
      setEvent(data);
    };
    getEventById(eventId);
  }, [eventId]);

  return (
    <Container>
      <Button onClick={() => history.goBack()}>
        <ArrowBackIcon />
        Go Back
      </Button>
      {event && (
        <Card className={classes.card}>
          <CardHeader
            title={moment(event.eventDateTime).format("MMMM Do, YYYY")}
            subheader={event.game.name}
          />
          <CardContent>
            <Typography variant="body1">
              Hosted by: {event.host.name}
            </Typography>
            <Typography variant="body1">
              Guests: {event.guests.length}
            </Typography>
            <Typography variant="body1">Game Info:</Typography>
            <GameDetails game={event.game} />
          </CardContent>
          <CardActions>
            <Button>Join</Button>
            <Button>Edit</Button>
          </CardActions>
        </Card>
      )}
    </Container>
  );
};

export default EventDetailsPage;
