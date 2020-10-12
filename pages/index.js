import { Container, Typography } from "@material-ui/core";
import Link from "next/link";
import React, { Fragment } from "react";
import EventsListContainer from "../components/EventsListContainer";
import useRequest from "../util/useRequest";

const HomePage = () => {
  const { data } = useRequest({
    url: "/api/user/auth",
  });

  const user = {
    _id: "5f84a965efe8f03df95ac6e8",
    email: "me@claudiorivera.com",
    name: "Claudio Rivera",
    events: [],
    eventsHosting: [],
    isAdmin: true,
    dateCreated: "2020-10-12T19:07:17.253Z",
  };

  return (
    <Container>
      {data && `${JSON.stringify(data)}`}
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
