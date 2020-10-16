import { Button, Container, Typography } from "@material-ui/core";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import EventsListContainer from "../components/EventsListContainer";
import middleware from "../middleware";
import Event from "../models/Event";

const HomePage = ({ eventsHosting, eventsAttending }) => {
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

  return (
    <Container>
      <pre>Hosting: {JSON.stringify(eventsHosting, null, 2)}</pre>
      <pre>Attending: {JSON.stringify(eventsAttending, null, 2)}</pre>
      <Typography variant="body1">Hello, {session.user.name}.</Typography>
      {eventsHosting.length > 0 && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Hosting:
          </Typography>
          <EventsListContainer events={eventsHosting} isHosting />
        </Fragment>
      )}
      {eventsAttending.length > 0 && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Attending:
          </Typography>
          <EventsListContainer events={eventsAttending} />
        </Fragment>
      )}
    </Container>
  );
};

export default HomePage;

export const getServerSideProps = async ({ req, res }) => {
  await middleware.apply(req, res);
  const session = await getSession({ req });

  if (!session) return { props: { eventsHosting: [], eventsAttending: [] } };

  // TODO: Implement logic to fetch these
  const eventsHosting = await Event.find({
    eventHost: session.user.id,
  }).lean();
  const eventsAttending = await Event.find().lean();

  return {
    // https://github.com/vercel/next.js/discussions/11209#discussioncomment-35915
    props: JSON.parse(JSON.stringify({ eventsHosting, eventsAttending })),
  };
};
