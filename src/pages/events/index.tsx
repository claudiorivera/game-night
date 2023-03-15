import { LoadingButton } from "@mui/lab";
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
      <EventsListContainer events={events} />
    </>
  );
};

export default EventsListPage;
