import EventsListContainer from "@components/EventsListContainer";
import { Button, Container, Typography } from "@material-ui/core";
import middleware from "@middleware";
import Event from "@models/Event";
import useEvents from "@util/useEvents";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";

const EventsListPage = ({ initialData }) => {
  const router = useRouter();
  const { events } = useEvents(initialData);
  const [session] = useSession();

  if (!session)
    return (
      <>
        <Typography variant="h5" align="center">
          You must be logged in to view this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={signIn}
        >
          Login
        </Button>
      </>
    );

  return (
    <>
      <Container style={{ marginBottom: "1rem" }}>
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
      {events && (
        <Container>
          <EventsListContainer events={events} />
        </Container>
      )}
    </>
  );
};

export default EventsListPage;

export const getServerSideProps = async ({ req, res }) => {
  await middleware.run(req, res);
  const events = await Event.find().lean();
  return {
    props: {
      initialData: JSON.parse(JSON.stringify({ events })) || null,
    },
  };
};
