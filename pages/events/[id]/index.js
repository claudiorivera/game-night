import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { AvatarGroup } from "@material-ui/lab";
import axios from "axios";
import moment from "moment";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import GameDetails from "../../../components/GameDetails";
import { AlertContext } from "../../../context/Alert";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import useEvent from "../../../util/useEvent";

const StyledCard = styled(Card)({
  margin: "1rem",
  padding: "2rem",
  flexDirection: "column",
});

const StyledDivider = styled(Divider)({
  margin: "2rem",
});

const EventDetailsPage = ({ initialData }) => {
  const router = useRouter();
  const { createAlertWithMessage } = useContext(AlertContext);
  const { event } = useEvent(router.query.id, initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [session] = useSession();

  if (!session)
    return (
      <Container>
        <Typography variant="h5" align="center">
          You must be logged in to view this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={signIn}
        >
          Login
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
            <GameDetails fetchById={event.eventGame._id} />
            <StyledDivider variant="middle" />
            <Container>
              <Typography variant="body1">Host:</Typography>
              <Tooltip title={event.eventHost.name}>
                <Avatar
                  alt={event.eventHost.name}
                  src={event.eventHost.image}
                />
              </Tooltip>
            </Container>
            <Container>
              <Typography variant="subtitle1">Guests:</Typography>
              <AvatarGroup max={8}>
                {event.eventGuests.map((guest) => (
                  <Tooltip key={guest.name} title={guest.name}>
                    <Avatar alt={guest.name} src={guest.image} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Container>
          </CardContent>
          <CardActions>
            {/* If user is already a guest, show the Leave button */}
            {event.eventGuests.some(
              (guest) => guest._id === session.user.id
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
            event.eventHost._id !== session.user.id ? (
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
            {event.eventHost._id === session.user.id && (
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
  await middleware.run(req, res);
  const event = await Event.findById(params.id).lean();
  return {
    props: {
      initialEventData: JSON.parse(JSON.stringify(event)) || null,
    },
  };
};
