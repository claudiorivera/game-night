import { EventsListContainer, TypographyH4, TypographyP } from "components";
import { eventSelect } from "lib/api";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { PopulatedEvent } from "types";

import prisma from "../lib/prisma";
import { nextAuthOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
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

  if (!user) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

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
      <TypographyP>Hello, {name}.</TypographyP>
      {!!eventsHosting.length && (
        <>
          <TypographyH4>Events You Are Hosting:</TypographyH4>
          <EventsListContainer
            events={[...eventsHosting, ...eventsHosting, ...eventsHosting]}
            isHosting
            sx={{ mb: 2 }}
          />
        </>
      )}
      {!!eventsAttending.length && (
        <>
          <TypographyH4>Events You Are Attending:</TypographyH4>
          <EventsListContainer events={eventsAttending} sx={{ mb: 2 }} />
        </>
      )}
    </>
  );
};

export default HomePage;
