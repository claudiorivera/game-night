import React, { useContext, Fragment, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { UserContext } from "../user/context";
import EventsListContainer from "../events/components/EventsListContainer";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user, getUserEvents, getUserEventsHosting } = useContext(UserContext);

  useEffect(() => {
    if (user?._id) {
      getUserEvents(user._id);
      getUserEventsHosting(user._id);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      {!user && (
        <Typography variant="h4">
          Hello, there. Please <Link to="/login">login or register</Link> to
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
