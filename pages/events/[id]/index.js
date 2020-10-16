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
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import GameDetails from "../../../components/GameDetails";
import { AlertContext } from "../../../context/Alert";
import useEvent from "../../../util/useEvent";
import middleware from "../../../middleware";
import Event from "../../../models/Event";

const StyledCard = styled(Card)({
  margin: "10px",
  padding: "20px",
  flexDirection: "column",
});

const EventDetailsPage = ({ initialData }) => {
  const [session] = useSession();
  const router = useRouter();
  const { event } = useEvent(router.query.id, initialData);
  const { createAlertWithMessage } = useContext(AlertContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!session)
    return (
      <Container>
        <Typography variant="h3">
          You must be logged in to access this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Login/Register
        </Button>
      </Container>
    );

  // Delete confirm dialog
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const handleDelete = async () => {
    await deleteEventById(event._id);
    router.back();
  };

  const deleteEventById = async (id) => {
    try {
      const response = await axios.delete(`/api/events/${id}`);
      createAlertWithMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const joinEventById = async (id) => {
    try {
      const response = await axios.put(`/api/events/${id}?action=join`);
      createAlertWithMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const leaveEventById = async (id) => {
    try {
      const response = await axios.put(`/api/events/${id}?action=leave`);
      createAlertWithMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Button onClick={() => router.back()}>
        <ArrowBackIcon />
        Go Back
      </Button>
      {event ? (
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
            <GameDetails fetchById={event.eventGame._id} />
          </CardContent>
          <CardActions>
            {/* If user is already a guest, show the Leave button */}
            {event.eventGuests.some((guest) => guest.id === session.user.id) ? (
              <Button
                onClick={async () => {
                  await leaveEventById(event._id);
                  router.back();
                }}
              >
                Leave
              </Button>
            ) : // Otherwise, as long as user isn't the host, show the Join button
            event.eventHost.id !== session.user.id ? (
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
                  router.push(`/events/${router.query.id}/edit`);
                }}
              >
                Edit
              </Button>
            )}
            {/* Show the Delete button to hosts and admins */}
            {event.eventHost.id === session.user.id && (
              <Button
                onClick={async () => {
                  setIsDialogOpen(true);
                }}
              >
                Delete
              </Button>
            )}
          </CardActions>
        </StyledCard>
      ) : (
        ""
      )}
      <Dialog
        open={isDialogOpen}
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

export const getServerSideProps = async ({ req, res, params }) => {
  await middleware.apply(req, res);
  const event = await Event.findById(params.id).lean();
  return {
    props: {
      initialEventData: JSON.parse(JSON.stringify(event)) || null,
    },
  };
};
