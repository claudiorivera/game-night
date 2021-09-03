import { Button, Container, Typography } from "@material-ui/core";
import { EventsListContainer } from "components";
import middleware from "middleware";
import { EventModel } from "models";
import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import { IEvent } from "types";

interface Props {
  allEvents: IEvent[];
}
const EventsListPage = ({ allEvents }: Props) => {
  const router = useRouter();
  const [session] = useSession();

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

  return (
    <>
      <Container style={{ marginBottom: "1rem" }}>
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
      {!!allEvents.length && (
        <Container>
          <EventsListContainer events={allEvents} />
        </Container>
      )}
    </>
  );
};

export default EventsListPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await middleware.run(req, res);
  const allEvents = (await EventModel.find().populate(
    "eventGame",
    "name imageSrc"
  )) as [IEvent];
  return {
    props: allEvents ? JSON.parse(JSON.stringify({ allEvents })) : [],
  };
};
