import { Button, CircularProgress, Container, Typography } from "@mui/material";
import { EventsListContainer } from "components";
import useEvents from "hooks/useEvents";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const EventsListPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { events, isLoading } = useEvents();

  if (!session)
    return (
      <>
        <Typography variant="h5" align="center">
          You must be logged in to view this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={() => {
            signIn();
          }}
        >
          Login
        </Button>
      </>
    );

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Container sx={{ marginBottom: "1rem" }}>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          onClick={() => {
            router.push("/events/add");
          }}
        >
          Add Event
        </Button>
      </Container>
      <Container>
        <EventsListContainer events={events} />
      </Container>
    </>
  );
};

export default EventsListPage;
