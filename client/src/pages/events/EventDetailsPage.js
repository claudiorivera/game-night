import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import GameDetails from "../games/components/GameDetails";
import { UserContext } from "../user/context";
import { EventsContext } from "../events/context";

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
  const { url } = useRouteMatch();
  const [event, setEvent] = useState(null);
  const { user } = useContext(UserContext);
  const { deleteEventById, leaveEventById, joinEventById } = useContext(
    EventsContext
  );

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
            title={moment(event.eventDateTime).format(
              "MMMM Do, YYYY [at] h:mma"
            )}
            subheader={event.game.name}
          />
          <CardContent>
            <Typography variant="body1">
              Hosted by: {event.host.name}
            </Typography>
            <Typography variant="subtitle1">
              Guests:
              {event.guests.map((guest, index) => (
                <Chip key={index} label={guest.name} />
              ))}
            </Typography>
            <Typography variant="body1">Game Info:</Typography>
            <GameDetails game={event.game} />
          </CardContent>
          <CardActions>
            {/* If user is already a guest, show the Leave button */}
            {event.guests.some((guest) => guest._id === user._id) ? (
              <Button
                onClick={async () => {
                  await leaveEventById(event._id);
                  history.goBack();
                }}
              >
                Leave
              </Button>
            ) : // Otherwise, as long as user isn't the host, show the Join button
            event.host._id !== user._id ? (
              <Button
                onClick={async () => {
                  await joinEventById(event._id);
                  history.goBack();
                }}
              >
                Join
              </Button>
            ) : (
              // Otherwise, we're the host, so show the Edit button
              <Button
                onClick={() => {
                  history.push(`${url}/edit`);
                }}
              >
                Edit
              </Button>
            )}
            {/* Show the Delete button to hosts and admins */}
            {(event.host._id === user._id || user.isAdmin) && (
              <Button
                onClick={async () => {
                  await deleteEventById(event._id);
                  history.goBack();
                }}
              >
                Delete
              </Button>
            )}
          </CardActions>
        </Card>
      )}
    </Container>
  );
};

export default EventDetailsPage;
