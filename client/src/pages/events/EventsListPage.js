import React, { useEffect, useContext, Fragment } from "react";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventsListContainer from "./components/EventsListContainer";
import { useHistory } from "react-router-dom";
import { EventsContext } from "./context";

const useStyles = makeStyles((theme) => ({
  mb: {
    marginBottom: "1.5rem",
  },
}));

const EventsListPage = () => {
  const { getAllEvents, events } = useContext(EventsContext);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const fetchEvents = async () => {
      await getAllEvents();
    };
    fetchEvents();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Container className={classes.mb}>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          onClick={() => {
            history.push("/events/add");
          }}
        >
          Add Event
        </Button>
      </Container>
      <Container>
        {events ? <EventsListContainer events={events} /> : ""}
      </Container>
    </Fragment>
  );
};

export default EventsListPage;
