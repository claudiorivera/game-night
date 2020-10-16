import { Button, Container, Typography } from "@material-ui/core";
import React from "react";
import EventsListContainer from "../components/EventsListContainer";
import useEvents from "../util/useEvents";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import middleware from "../middleware";
import Game from "../models/Game";

const HomePage = ({ initialData }) => {
  const { events } = useEvents(initialData);
  const router = useRouter();
  const [session] = useSession();

  if (!session)
    return (
      <Container>
        <Typography variant="h4">Welcome. Please login or register.</Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Login/Register
        </Button>
      </Container>
    );

  const userEventsHosting = [];
  const userEventsAttending = [];

  return (
    <Container>
      <Typography variant="body1">Hello, {session.user.name}.</Typography>
      {userEventsHosting.length > 0 && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Hosting:
          </Typography>
          <EventsListContainer events={userEventsHosting} isHosting />
        </Fragment>
      )}
      {userEventsAttending.length > 0 && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Attending:
          </Typography>
          <EventsListContainer events={userEventsAttending} />
        </Fragment>
      )}
    </Container>
  );
};

export default HomePage;

export const getServerSideProps = async ({ req, res }) => {
  await middleware.apply(req, res);
  const games = await Game.find().lean();
  return {
    props: {
      eventsHosting: JSON.stringify(eventsHosting) || null,
      eventsAttending: JSON.stringify(eventsAttending) || null,
    },
  };
};
