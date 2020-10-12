import { Button, Container } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect } from "react";
import EventsListContainer from "../../components/EventsListContainer";
import { EventsContext } from "../../context/Events";

const StyledContainer = styled(Container)({
  marginBottom: "1.5rem",
});

const EventsListPage = () => {
  const router = useRouter();
  const { getAllEvents, events } = useContext(EventsContext);

  useEffect(() => {
    const fetchEvents = async () => {
      await getAllEvents();
    };
    fetchEvents();
  }, []);

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
