import { CircularProgress, Container, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import EventsListContainer from "../components/EventsListContainer";
import useCurrentUser from "../util/useCurrentUser";
import useEvents from "../util/useEvents";

const HomePage = () => {
  const { user } = useCurrentUser();
  const { events } = useEvents();

  if (!user || !events)
    return (
      <Typography align="center" component={"div"}>
        <CircularProgress size={200} thickness={4} />
      </Typography>
    );

  return (
    <Container>
      <Typography variant="body1">Hello, {user.name}.</Typography>
      {user.eventsHosting.length > 0 && (
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
      )}
    </Container>
  );
};

export default HomePage;
