import React, { useContext, Fragment, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { UserContext } from "../user/context";
import EventsListContainer from "../events/components/EventsListContainer";

const HomePage = () => {
  const { user, getUserEvents, getUserEventsHosting } = useContext(UserContext);

  useEffect(() => {
    if (user && user._id) {
      getUserEvents(user._id);
      getUserEventsHosting(user._id);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Typography variant="h4">
        Hello, {user ? user.name : "there. Please log in or register"}.
      </Typography>
      {user && user.events && user.eventsHosting && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Hosting:
          </Typography>
          <EventsListContainer events={user.eventsHosting} isHosting />
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
