import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  AvatarGroup,
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
} from "@mui/material";
import { User } from "@prisma/client";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { useContext, useState } from "react";

import { GameDetails } from "~/components";
import { SnackbarContext } from "~/context/Snackbar";
import { api } from "~/lib/api";
import { authOptions } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const EventDetailsPage = () => {
  const router = useRouter();
  const { createErrorMessage, createSuccessMessage } =
    useContext(SnackbarContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: user } = api.user.getCurrentUser.useQuery();

  const { data: event } = api.event.getById.useQuery(
    {
      id: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    }
  );

  const { mutate: deleteEventById, isLoading: isDeletingEvent } =
    api.event.deleteById.useMutation({
      onSuccess: () => {
        createSuccessMessage("Event deleted!");
        router.back();
      },
      onError: (error) => {
        createErrorMessage(error.message);
      },
    });

  const { mutate: leaveEventById, isLoading: isLeavingEvent } =
    api.event.leaveById.useMutation({
      onSuccess: () => {
        createSuccessMessage("You have left the event!");
        router.back();
      },
      onError: (error) => {
        createErrorMessage(error.message);
      },
    });

  const { mutate: joinEventById, isLoading: isJoiningEvent } =
    api.event.joinById.useMutation({
      onSuccess: () => {
        createSuccessMessage("You have joined the event!");
        router.back();
      },
      onError: (error) => {
        createErrorMessage(error.message);
      },
    });

  const disabled = isDeletingEvent || isLeavingEvent || isJoiningEvent;

  if (!event || !user) return null;

  const { game } = event;

  // Delete confirm dialog
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    deleteEventById({ id: event.id });
  };

  return (
    <Container>
      <Button onClick={() => router.back()}>
        <ArrowBackIcon />
        Go Back
      </Button>
      <Card
        sx={{
          m: 2,
          p: 4,
          flexDirection: "column",
        }}
      >
        <CardHeader
          title={moment(event.dateTime).format("MMMM Do, YYYY [at] h:mma")}
          subheader={game.name}
        />
        <CardContent>
          <GameDetails game={game} />
          <Divider
            variant="middle"
            sx={{
              m: 4,
            }}
          />
          <Container>
            <Typography variant="body1">Host:</Typography>
            <Tooltip title={event.host.name as string}>
              <Avatar
                alt={event.host.name as string}
                src={event.host.image as string}
              />
            </Tooltip>
          </Container>
          <Container>
            <Typography variant="subtitle1">Guests:</Typography>
            <AvatarGroup max={8}>
              {event.guests.map((guest: Pick<User, "name" | "image">) => (
                <Tooltip
                  key={guest.name as string}
                  title={guest.name as string}
                >
                  <Avatar
                    alt={guest.name as string}
                    src={guest.image as string}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          </Container>
        </CardContent>
        <CardActions>
          {/* If user is already a guest, show the Leave button */}
          {event.guests.some((guest) => guest.id === user.id) ? (
            <LoadingButton
              disabled={disabled}
              loading={disabled}
              onClick={() => {
                leaveEventById({ id: event.id });
              }}
            >
              Leave
            </LoadingButton>
          ) : // Otherwise, as long as user isn't the host, show the Join loadingbutton
          event.host.id !== user.id ? (
            <LoadingButton
              disabled={disabled}
              loading={disabled}
              onClick={() => {
                joinEventById({ id: event.id });
              }}
            >
              Join
            </LoadingButton>
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
          {(event.host.id === user.id || !!user.isAdmin) && (
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
          <LoadingButton
            disabled={disabled}
            loading={disabled}
            onClick={handleDelete}
            color="primary"
            autoFocus
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventDetailsPage;
