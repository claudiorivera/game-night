import EventsListContainer from "@components/EventsListContainer";
import {
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import middleware from "@middleware";
import Event from "@models/Event";
import fetcher from "@util/fetcher";
import { getSession, signIn, useSession } from "next-auth/client";
import React, { Fragment } from "react";
import useSWR from "swr";

const HomePage = ({ eventsHosting, eventsAttending }) => {
  const [session] = useSession();

  if (!session)
    return (
      <Container>
        <Typography variant="h5" align="center">
          Welcome. Please login.
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
      </Container>
    );

  const { data: user } = useSWR(`/api/user/${session.user.id}`, fetcher);

  if (!user) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="body1">Hello, {user.name}.</Typography>
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
  await middleware.run(req, res);
  const session = await getSession({ req });

  if (!session) return { props: { eventsHosting: [], eventsAttending: [] } };

  const allEvents = await Event.find().lean();

  const eventsHosting = allEvents.filter(
    (event) => event.eventHost._id.toString() === session.user.id
  );
  const eventsAttending = allEvents.filter(
    (event) =>
      event.eventGuests.filter(
        (guest) => guest._id.toString() === session.user.id
      ).length > 0
  );

  return {
    // https://github.com/vercel/next.js/discussions/11209#discussioncomment-35915
    props: JSON.parse(JSON.stringify({ eventsHosting, eventsAttending })),
  };
};
