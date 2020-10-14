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
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import GameDetails from "../../../components/GameDetails";
import { AlertContext } from "../../../context/Alert";
import fetcher from "../../../util/fetcher";
import useCurrentUser from "../../../util/useCurrentUser";

const StyledCard = styled(Card)({
  margin: "10px",
  padding: "20px",
  flexDirection: "column",
});

const EventDetailsPage = () => {
  const router = useRouter();
  const { user } = useCurrentUser();
  const { data, error } = useSWR(`/api/events/${router.query.id}`, fetcher);
  const { createAlertWithMessage } = useContext(AlertContext);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

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

  if (error) return <div>failed to load</div>;
  if (!data)
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
      {data.event && (
        <StyledCard>
          <CardHeader
            title={moment(data.event.eventDateTime).format(
              "MMMM Do, YYYY [at] h:mma"
            )}
            subheader={data.event.eventGame.name}
          />
          <CardContent>
            <Typography variant="body1">
              Hosted by: {data.event.eventHost.name}
            </Typography>
            <Typography variant="subtitle1">
              Guests:
              {data.event.eventGuests.map((guest, index) => (
                <Chip key={index} label={guest.name} />
              ))}
            </Typography>
            <Typography variant="body1">Game Info:</Typography>
            <GameDetails game={data.event.eventGame} />
          </CardContent>
          <CardActions>
            {/* If user is already a guest, show the Leave button */}
            {data.event.eventGuests.some((guest) => guest._id === user._id) ? (
              <Button
                onClick={async () => {
                  await leaveEventById(data.event._id);
                  router.back();
                }}
              >
                Leave
              </Button>
            ) : // Otherwise, as long as user isn't the host, show the Join button
            data.event.eventHost._id !== user._id ? (
              <Button
                onClick={async () => {
                  await joinEventById(data.event._id);
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
            {(data.event.eventHost._id === user._id || user.isAdmin) && (
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
