import React, { useEffect, useContext, Fragment } from "react";
import { Container, Button } from "@material-ui/core";
import EventsListContainer from "./components/EventsListContainer";
import { EventsContext } from "./context";
import { styled } from "@material-ui/styles";
import { useRouter } from "next/router";

const ContainerWithMargin = styled(Container)({
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
      <ContainerWithMargin>
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
      </ContainerWithMargin>
      <Container>
        {events ? <EventsListContainer events={events} /> : ""}
      </Container>
    </Fragment>
  );
};

export default EventsListPage;
