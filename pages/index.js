// import { CircularProgress, Container, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
// import EventsListContainer from "../components/EventsListContainer";
// import useEvents from "../util/useEvents";
import { signIn, signOut, useSession } from "next-auth/client";

const HomePage = () => {
  const [session, loading] = useSession();
  // const { events } = useEvents();

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </>
  );

  // return (
  //   <Container>
  //     <Typography variant="body1">Hello, {user.name}.</Typography>
  //     {user.eventsHosting.length > 0 && (
  //       <Fragment>
  //         <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
  //           Events You Are Hosting:
  //         </Typography>
  //         <EventsListContainer events={userEventsHosting} isHosting />
  //       </Fragment>
  //     )}
  //     {user.eventsAttending.length > 0 && (
  //       <Fragment>
  //         <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
  //           Events You Are Attending:
  //         </Typography>
  //         <EventsListContainer events={userEventsAttending} />
  //       </Fragment>
  //     )}
  //   </Container>
  // );
};

export default HomePage;
