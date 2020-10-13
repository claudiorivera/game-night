import { CircularProgress, Container, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import EventsListContainer from "../components/EventsListContainer";
import useCurrentUser from "../util/useCurrentUser";

const HomePage = () => {
  const router = useRouter();
  const [user] = useCurrentUser();

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
