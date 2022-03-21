import { Typography } from "@mui/material";
import { EventsListContainer } from "components";
import { eventSelect } from "lib/api";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { PopulatedEvent } from "types";

import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
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
            style={{ marginBottom: "1rem" }}
          />
        </>
      )}
      {!!eventsAttending.length && (
        <>
          <Typography variant="h4" gutterBottom>
            Events You Are Attending:
          </Typography>
          <EventsListContainer
            events={eventsAttending}
            style={{ marginBottom: "1rem" }}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
