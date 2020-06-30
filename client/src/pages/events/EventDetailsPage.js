import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import { UserContext } from "../user/context";
const axios = require("axios").default;

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEventById = async (id) => {
      const { data } = await axios.get(`/api/events/${id}`);
      setEvent(data);
    };
    getEventById(eventId);
  }, []);

  return (
    <Container>
      <Link to="#" onClick={() => history.goBack()}>
        Go Back
      </Link>
      {event && <h1>{event._id}</h1>}
    </Container>
  );
};

export default EventDetailsPage;
