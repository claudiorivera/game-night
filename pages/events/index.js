import { Button, Container } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import EventsListContainer from "../../components/EventsListContainer";
import useEvents from "../../util/useEvents";

const StyledContainer = styled(Container)({
  marginBottom: "1.5rem",
});

const EventsListPage = () => {
  const router = useRouter();
  const [events] = useEvents();

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
        {events ? <EventsListContainer events={events} /> : ""}
      </Container>
    </Fragment>
  );
};

export default EventsListPage;
