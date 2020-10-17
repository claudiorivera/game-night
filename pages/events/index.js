import { Button, Container } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { Fragment, useContext } from "react";
import EventsListContainer from "../../components/EventsListContainer";
import { AlertContext } from "../../context/Alert";
import middleware from "../../middleware";
import Event from "../../models/Event";
import useEvents from "../../util/useEvents";

const StyledContainer = styled(Container)({
  marginBottom: "1.5rem",
});

const EventsListPage = ({ initialData }) => {
  const [session] = useSession();
  const { createAlertWithMessage } = useContext(AlertContext);
  const router = useRouter();
  const { events } = useEvents(initialData);

  if (!session) {
    createAlertWithMessage("You must be signed in to access this page");
    router.push("/auth/login");
  }

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

export const getServerSideProps = async ({ req, res }) => {
  await middleware.apply(req, res);
  const events = await Event.find().lean();
  return {
    props: {
      initialData: JSON.parse(JSON.stringify({ events })) || null,
    },
  };
};
