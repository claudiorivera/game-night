import { Button, Container, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import EventsListContainer from "../../components/EventsListContainer";
import useEvents from "../../util/useEvents";

const StyledContainer = styled(Container)({
  marginBottom: "1.5rem",
});

const EventsListPage = () => {
  const router = useRouter();
  const { events } = useEvents();
  const [session] = useSession();

  if (!session)
    return (
      <Container>
        <Typography variant="h3">
          You must be logged in to access this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={() => {
            router.push("/auth/user");
          }}
        >
          Login/Register
        </Button>
      </Container>
    );

  return (
    <Fragment>
      <StyledContainer>
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
      </StyledContainer>
      {events && (
        <Container>
          <EventsListContainer events={events} />
        </Container>
      )}
    </Fragment>
  );
};

export default EventsListPage;
