import { CircularProgress, Container, Typography } from "@material-ui/core";
import React from "react";
// import EventsListContainer from "../components/EventsListContainer";
// import useEvents from "../util/useEvents";
import { useSession } from "next-auth/client";

const HomePage = () => {
  const [session] = useSession();

  if (!session)
    return (
      <Typography align="center" component={"div"}>
        <CircularProgress size={200} thickness={4} />
      </Typography>
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
