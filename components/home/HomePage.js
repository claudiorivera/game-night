import { Container, Typography } from "@material-ui/core";
import Link from "next/link";
import React, { Fragment, useContext, useEffect } from "react";
import EventsListContainer from "../events/components/EventsListContainer";
import { UserContext } from "../user/context";

const HomePage = () => {
  const { user, getUserEvents, getUserEventsHosting } = useContext(UserContext);

  useEffect(() => {
    if (user?._id) {
      getUserEvents(user._id);
      getUserEventsHosting(user._id);
    }
  }, []);

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
