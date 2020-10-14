import { Button, Container, Typography } from "@material-ui/core";
import React from "react";
// import EventsListContainer from "../components/EventsListContainer";
// import useEvents from "../util/useEvents";
import { useSession } from "next-auth/client";
import Link from "next/link";

const HomePage = () => {
  const [session] = useSession();

  if (!session)
    return (
      <Container>
        <Typography variant="h3">Welcome. Please login or register.</Typography>
        <Link href="/api/auth/signin">
          <Button
            type="submit"
            size="large"
            fullWidth
            color="secondary"
            variant="contained"
          >
            Login/Register
          </Button>
        </Link>
      </Container>
    );

  return (
    <Container>
      <Typography variant="body1">Hello, {session.user.name}.</Typography>
      {/* {user.eventsHosting.length > 0 && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Hosting:
          </Typography>
          <EventsListContainer events={userEventsHosting} isHosting />
        </Fragment>
      )}
      {user.eventsAttending.length > 0 && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Attending:
          </Typography>
          <EventsListContainer events={userEventsAttending} />
        </Fragment>
      )} */}
    </Container>
  );
};

export default HomePage;
