import React, { Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "@material-ui/core";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const history = useHistory();
  return (
    <Fragment>
      {eventId}
      <br />
      <Link to="#" onClick={() => history.goBack()}>
        Go Back
      </Link>
    </Fragment>
  );
};

export default EventDetailsPage;
