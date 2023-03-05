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
import { Game, User } from "@prisma/client";
import axios from "axios";
import { AlertContext } from "context/Alert";
import { eventSelect } from "lib/api";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession, Session } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { useContext, useState } from "react";
import { PopulatedEvent } from "types";

import { GameDetails } from "~/components";

import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  if (params?.id) {
    const event = await prisma.event.findUnique({
      where: { id: +params.id },
      select: eventSelect,
    });

    const game = await prisma.game.findUnique({
      where: { id: event?.game.id },
    });

    if (!game || !event) {
      return {
        redirect: {
          destination: "/api/auth/signin",
          permanent: false,
        },
      };
    }

    return {
      props: {
        session,
        event: JSON.parse(JSON.stringify(event)),
        game: JSON.parse(JSON.stringify(game)),
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

type EventDetailsPageProps = {
  session: Session;
  event: PopulatedEvent;
  game: Game;
};
const EventDetailsPage = ({ session, event, game }: EventDetailsPageProps) => {
  const router = useRouter();
  const { createAlertWithMessage } = useContext(AlertContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Delete confirm dialog
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = async () => {
    await deleteEventById(event.id);
    router.back();
  };

  const deleteEventById = async (id: number) => {
    try {
      setDisabled(true);
      await axios.delete(`/api/events/${id}`);
    } catch (error) {
      createAlertWithMessage(JSON.stringify(error, null, 2));
      console.error(error);
    }
  };

  const joinEventById = async (id: number) => {
    try {
      await axios.put(`/api/events/${id}?action=join`);
    } catch (error) {
      createAlertWithMessage(JSON.stringify(error, null, 2));
      console.error(error);
    }
  };

  const leaveEventById = async (id: number) => {
    try {
      await axios.put(`/api/events/${id}?action=leave`);
    } catch (error) {
      createAlertWithMessage(JSON.stringify(error, null, 2));
      console.error(error);
    }
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
          {event.guests.some((guest) => guest.id === session.user.id) ? (
            <LoadingButton
              disabled={disabled}
              loading={disabled}
              onClick={async () => {
                setDisabled(true);
                await leaveEventById(event.id);
                router.back();
              }}
            >
              Leave
            </LoadingButton>
          ) : // Otherwise, as long as user isn't the host, show the Join loadingbutton
          event.host.id !== session.user.id ? (
            <LoadingButton
              disabled={disabled}
              loading={disabled}
              onClick={async () => {
                setDisabled(true);
                await joinEventById(event.id);
                router.back();
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
          {(event.host.id === session.user.id || !!session.user.isAdmin) && (
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
