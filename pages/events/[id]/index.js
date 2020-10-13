import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import GameDetails from "../../../components/GameDetails";
import { AlertContext } from "../../../context/Alert";
import { EventsContext } from "../../../context/Events";
import { UserContext } from "../../../context/User";

const StyledCard = styled(Card)({
  margin: "10px",
  padding: "20px",
  flexDirection: "column",
});

const EventDetailsPage = ({ id }) => {
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const { user } = useContext(UserContext);
  const { deleteEventById, leaveEventById, joinEventById } = useContext(
    EventsContext
  );
  const { createAlertWithMessage } = useContext(AlertContext);

  useEffect(() => {
    const getEventById = async (eventId) => {
      const response = await axios.get(`/api/events/${eventId}`);
      if (response.data.success) {
        setEvent(response.data.event);
      } else {
        createAlertWithMessage(response.data.message);
      }
    };
    getEventById(id);
  }, []);

  // Delete confirm dialog
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteEventById(event._id);
    router.back();
  };

  return (
    <Container>
      <Button onClick={() => router.back()}>
        <ArrowBackIcon />
        Go Back
      </Button>
      {event && (
        <StyledCard>
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
                  router.back();
                }}
              >
                Leave
              </Button>
            ) : // Otherwise, as long as user isn't the host, show the Join button
            event.host._id !== user._id ? (
              <Button
                onClick={async () => {
                  await joinEventById(event._id);
                  router.back();
                }}
              >
                Join
              </Button>
            ) : (
              // Otherwise, we're the host, so show the Edit button
              <Button
                onClick={() => {
                  router.push(`${router.pathname}/edit`);
                }}
              >
                Edit
              </Button>
            )}
            {/* Show the Delete button to hosts and admins */}
            {(event.host._id === user._id || user.isAdmin) && (
              <Button
                onClick={async () => {
                  setOpen(true);
                }}
              >
                Delete
              </Button>
            )}
          </CardActions>
        </StyledCard>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Event?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventDetailsPage;
