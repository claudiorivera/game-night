import { Typography } from "@mui/material";
import { EventsListContainer } from "components";
import { eventSelect } from "lib/api";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { PopulatedEvent } from "types";

import prisma from "../lib/prisma";
import { nextAuthOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in?callbackUrl=/",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      eventsHosting: {
        select: eventSelect,
      },
      eventsAttending: {
        select: eventSelect,
      },
    },
  });

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
};

type HomePageProps = {
  user: {
    name: string;
    eventsHosting: PopulatedEvent[];
    eventsAttending: PopulatedEvent[];
  };
};
const HomePage = ({ user }: HomePageProps) => {
  const { name, eventsHosting, eventsAttending } = user;

  return (
    <>
      <Typography variant="body1" gutterBottom>
        Hello, {name}.
      </Typography>
      {!!eventsHosting.length && (
        <>
          <Typography variant="h4" gutterBottom>
            Events You Are Hosting:
          </Typography>
          <EventsListContainer
            events={eventsHosting}
            isHosting
            sx={{ mb: 2 }}
          />
        </>
      )}
      {!!eventsAttending.length && (
        <>
          <Typography variant="h4" gutterBottom>
            Events You Are Attending:
          </Typography>
          <EventsListContainer events={eventsAttending} sx={{ mb: 2 }} />
        </>
      )}
    </>
  );
};

export default HomePage;
