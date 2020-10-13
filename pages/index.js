import { CircularProgress, Container, Typography } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import EventsListContainer from "../components/EventsListContainer";
import useCurrentUser from "../util/useCurrentUser";
import useEvents from "../util/useEvents";

const HomePage = () => {
  const router = useRouter();
  const [user] = useCurrentUser();
  const [events] = useEvents();

  useEffect(() => {
    if (!user) router.push("/login");
  }, []);

  return (
    <Container>
      {!user && (
        <Typography align="center" component={"div"}>
          <CircularProgress size={300} thickness={5} />
        </Typography>
      )}
      {user?._id && `Hello, ${user.name}.`}
      {events && user?.eventsHosting.length > 0 && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Hosting:
          </Typography>
          <EventsListContainer
            events={events.filter((event) => event.host._id === user._id)}
            isHosting
          />
        </Fragment>
      )}
      {events && user?.events.length > 0 && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Attending:
          </Typography>
          <EventsListContainer
            events={events.filter((event) => event.host._id !== user._id)}
          />
        </Fragment>
      )}
    </Container>
  );
};

export default HomePage;
