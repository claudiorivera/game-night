import { CircularProgress, Container, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import EventsListContainer from "../components/EventsListContainer";
import useCurrentUser from "../util/useCurrentUser";
import useEvents from "../util/useEvents";

const HomePage = () => {
  const { user, error } = useCurrentUser();
  const { events } = useEvents();

  if (error) return <div>failed to load</div>;
  if (!user) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="body1">Hello, {user.name}.</Typography>
      {events && user.eventsHosting.length > 0 && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Hosting:
          </Typography>
          <EventsListContainer
            events={events.filter((event) => event.eventHost._id === user._id)}
            isHosting
          />
        </Fragment>
      )}
      {events && user.eventsAttending.length > 0 && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Attending:
          </Typography>
          <EventsListContainer
            events={events.filter((event) =>
              event.eventGuests.includes(user._id)
            )}
          />
        </Fragment>
      )}
    </Container>
  );
};

export default HomePage;
