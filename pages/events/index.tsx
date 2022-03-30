import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/material";
import { EventsListContainer, NextLinkComposed } from "components";
import { eventSelect } from "lib/api";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
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
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Container sx={{ marginBottom: "1rem" }}>
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
      <Container>
        <EventsListContainer events={events} />
      </Container>
    </>
  );
};

export default EventsListPage;
