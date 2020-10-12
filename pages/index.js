import { Container, Typography } from "@material-ui/core";
import Link from "next/link";
import React, { Fragment } from "react";
import EventsListContainer from "../components/EventsListContainer";
import useUser from "../util/useUser";

const HomePage = () => {
  const [user] = useUser();

  return (
    <Container>
      {!user && (
        <Typography variant="h4">
          Hello, there. Please <Link href="/login">login or register</Link> to
          continue.
        </Typography>
      )}
      {user?._id && `Hello, ${user.name}.`}
      {user?.eventsHosting && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Hosting:
          </Typography>
          <EventsListContainer events={user.eventsHosting} isHosting />
        </Fragment>
      )}
      {user?.events && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Attending:
          </Typography>
          <EventsListContainer events={user.events} />
        </Fragment>
      )}
    </Container>
  );
};

export default HomePage;
