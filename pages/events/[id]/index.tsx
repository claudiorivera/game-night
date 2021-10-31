import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { GameDetails } from "components";
import { AlertContext } from "context/Alert";
import moment from "moment";
import { ObjectId } from "mongoose";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { IUser } from "types";
import useEvent from "hooks/useEvent";

const EventDetailsPage = () => {
  const router = useRouter();
  const { createAlertWithMessage } = useContext(AlertContext);
  const { event, isLoading } = useEvent(String(router.query.id));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: session } = useSession();

  if (!session || !createAlertWithMessage)
    return (
      <>
        <Typography variant="h5" align="center">
          You must be signed in to view this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={() => {
            signIn();
          }}
        >
          Sign In
        </Button>
      </>
    );

  if (isLoading) return <CircularProgress />;

  // Delete confirm dialog
  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const handleDelete = async () => {
    await deleteEventById(event._id);
    router.back();
  };

  const deleteEventById = async (id: ObjectId) => {
    try {
      const response = await axios.delete<any>(`/api/events/${id}`);
      createAlertWithMessage(response.data.message);
    } catch (error: any) {
      console.error(error);
    }
  };

  const joinEventById = async (id: ObjectId) => {
    try {
      const response = await axios.put<any>(`/api/events/${id}?action=join`);
      createAlertWithMessage(response.data.message);
    } catch (error: any) {
      console.error(error);
    }
  };

  const leaveEventById = async (id: ObjectId) => {
    try {
      const response = await axios.put<any>(`/api/events/${id}?action=leave`);
      createAlertWithMessage(response.data.message);
    } catch (error: any) {
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
        <Card
          sx={{
            margin: "1rem",
            padding: "2rem",
            flexDirection: "column",
          }}
        >
          <CardHeader
            title={moment(event.eventDateTime).format(
              "MMMM Do, YYYY [at] h:mma"
            )}
            subheader={event.eventGame.name}
          />
          <CardContent>
            <GameDetails fetchById={event.eventGame._id} />
            <Divider
              variant="middle"
              sx={{
                margin: "2rem",
              }}
            />
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
                {event.eventGuests.map((guest: IUser) => (
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
              (guest: IUser) => String(guest._id) === session.user.id
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
        </Card>
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
