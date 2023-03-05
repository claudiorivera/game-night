import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/material";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useState } from "react";

import { EventsListContainer, NextLinkComposed } from "~/components";
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

const EventsListPage = () => {
  const [disabled, setDisabled] = useState(false);
  const { data: events } = api.event.getAll.useQuery();

  if (!events) return null;

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
