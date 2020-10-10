import { useRouter } from "next/router";
import React from "react";
import EventDetailsPage from "../../components/events/EventDetailsPage";

const eventDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  return <EventDetailsPage id={id} />;
};

export default eventDetails;
