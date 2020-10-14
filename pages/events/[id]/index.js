import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
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
import React, { useContext, useState } from "react";
import GameDetails from "../../../components/GameDetails";
import { AlertContext } from "../../../context/Alert";
import useEvent from "../../../util/useEvent";
import useEvents from "../../../util/useEvents";
import { useSession } from "next-auth/client";
import Link from "next/link";

const StyledCard = styled(Card)({
  margin: "10px",
  padding: "20px",
  flexDirection: "column",
});

const EventDetailsPage = () => {
  const router = useRouter();
  const { event } = useEvent(router.query.id);
  const { eventsMutate } = useEvents();
  const { createAlertWithMessage } = useContext(AlertContext);
  const [session] = useSession();

  if (!session)
    return (
      <Container>
        <Typography variant="h3">
          You must be logged in to access this page.
        </Typography>
        <Link href="/api/auth/signin">
          <Button
            type="submit"
            size="large"
            fullWidth
            color="secondary"
            variant="contained"
          >
            Login/Register
          </Button>
        </Link>
      </Container>
    );

  // Delete confirm dialog
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    // await deleteEventById(event._id);
    console.log("deleting");
    router.back();
  };

  const joinEventById = async (id) => {
    try {
      const response = await axios.put(`/api/events/${id}?action=join`);
      eventsMutate();
      createAlertWithMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const leaveEventById = async (id) => {
    try {
      const response = await axios.put(`/api/events/${id}?action=leave`);
      eventsMutate();
      createAlertWithMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  if (!event)
    return (
      <Typography align="center" component={"div"}>
        <CircularProgress size={200} thickness={4} />
      </Typography>
    );

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
            subheader={event.eventGame.name}
          />
          <CardContent>
            <Typography variant="body1">
              Hosted by: {event.eventHost.name}
            </Typography>
            <Typography variant="subtitle1">
              Guests:
              {event.eventGuests.map((guest, index) => (
                <Chip key={index} label={guest.name} />
              ))}
            </Typography>
            <Typography variant="body1">Game Info:</Typography>
            <GameDetails game={event.eventGame} />
          </CardContent>
          <CardActions>
            {/* If user is already a guest, show the Leave button */}
            {event.eventGuests.some(
              (guest) => guest._id === session.user._id
            ) ? (
              <Button
                onClick={async () => {
                  await leaveEventById(event._id);
                  router.back();
                }}
              >
                Leave
              </Button>
            ) : // Otherwise, as long as user isn't the host, show the Join button
            event.eventHost._id !== session.user._id ? (
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
            {(event.eventHost._id === session.user._id ||
              session.user.isAdmin) && (
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
