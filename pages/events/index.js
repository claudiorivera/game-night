import {
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import EventsListContainer from "../../components/EventsListContainer";
import useCurrentUser from "../../util/useCurrentUser";
import useEvents from "../../util/useEvents";

const StyledContainer = styled(Container)({
  marginBottom: "1.5rem",
});

const EventsListPage = () => {
  const router = useRouter();
  const { events } = useEvents();
  const { user } = useCurrentUser();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

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
      <Container>
        {events ? (
          <EventsListContainer events={events} />
        ) : (
          <Typography align="center" component={"div"}>
            <CircularProgress size={200} thickness={4} />
          </Typography>
        )}
      </Container>
    </Fragment>
  );
};

export default EventsListPage;
