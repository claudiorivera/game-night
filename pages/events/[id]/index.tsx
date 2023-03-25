import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
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
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import { Game, User } from "@prisma/client";
import axios from "axios";
import { GameDetails } from "components";
import { AlertContext } from "context/Alert";
import { eventSelect } from "lib/api";
import moment from "moment";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServerSession, Session } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { Fragment, useContext, useState } from "react";
import { PopulatedEvent } from "types";

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
      where: { id: params.id as string },
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

  const deleteEventById = async (id: string) => {
    try {
      setDisabled(true);
      await axios.delete(`/api/events/${id}`);
    } catch (error) {
      createAlertWithMessage(JSON.stringify(error, null, 2));
      console.error(error);
    }
  };

  const joinEventById = async (id: string) => {
    try {
      await axios.put(`/api/events/${id}?action=join`);
    } catch (error) {
      createAlertWithMessage(JSON.stringify(error, null, 2));
      console.error(error);
    }
  };

  const leaveEventById = async (id: string) => {
    try {
      await axios.put(`/api/events/${id}?action=leave`);
    } catch (error) {
      createAlertWithMessage(JSON.stringify(error, null, 2));
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <Link href="/events" className="btn-ghost btn">
        <div className="flex items-center gap-2">
          <ArrowLeftIcon className="h-5 w-5" />
          Go Back
        </div>
      </Link>
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
            <p>Host:</p>
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
      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-full max-w-md transform flex-col gap-2 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Event
                  </Dialog.Title>
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this event?
                  </p>

                  <div className="flex justify-between">
                    <button type="button" className="btn" onClick={handleClose}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-error btn"
                      onClick={handleDelete}
                    >
                      Yes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EventDetailsPage;
