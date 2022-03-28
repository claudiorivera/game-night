import { Button, Container } from "@mui/material";
import { EventsListContainer } from "components";
import { eventSelect } from "lib/api";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { PopulatedEvent } from "types";

import prisma from "../../lib/prisma";

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

  const events = await prisma.event.findMany({
    select: eventSelect,
  });
  return {
    props: { events: JSON.parse(JSON.stringify(events)) },
  };
};

type EventsListPageProps = {
  events: PopulatedEvent[];
};
const EventsListPage = ({ events }: EventsListPageProps) => {
  const router = useRouter();

  return (
    <>
      <Container sx={{ marginBottom: "1rem" }}>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          onClick={() => {
            router.push("/events/add");
          }}
        >
          Add Event
        </Button>
      </Container>
      <Container>
        <EventsListContainer events={events} />
      </Container>
    </>
  );
};

export default EventsListPage;
