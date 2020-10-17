import { Container, Typography } from "@material-ui/core";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { Fragment, useContext } from "react";
import EventsListContainer from "../components/EventsListContainer";
import { AlertContext } from "../context/Alert";
import middleware from "../middleware";
import Event from "../models/Event";

const HomePage = ({ eventsHosting, eventsAttending }) => {
  const router = useRouter();
  const { createAlertWithMessage } = useContext(AlertContext);
  const [session] = useSession();

  if (!session) {
    createAlertWithMessage("You must be signed in to access this page");
    router.push("/auth/login");
  }

  return (
    <Container>
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
