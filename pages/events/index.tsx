import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/material";
import { EventsListContainer, NextLinkComposed } from "components";
import { eventSelect } from "lib/api";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { useState } from "react";
import { PopulatedEvent } from "types";

import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
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
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Container sx={{ py: 2 }}>
        <LoadingButton
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          disabled={disabled}
          loading={disabled}
          component={NextLinkComposed}
          to={{
            pathname: "/events/add",
          }}
          onClick={() => {
            setDisabled(true);
          }}
        >
          Add Event
        </LoadingButton>
      </Container>
      <Container sx={{ py: 2 }}>
        <EventsListContainer events={events} />
      </Container>
    </>
  );
};

export default EventsListPage;
