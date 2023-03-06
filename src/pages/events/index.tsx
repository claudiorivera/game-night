import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/material";
import { useState } from "react";

import { EventsListContainer, NextLinkComposed } from "~/components";
import { api } from "~/lib/api";

const EventsListPage = () => {
  const [disabled, setDisabled] = useState(false);
  const { data: events } = api.event.getAll.useQuery();

  if (!events) return null;

  return (
    <>
      <Container sx={{ py: 2 }}>
        <LoadingButton
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          disabled={disabled}
          loading={disabled}
          component={NextLinkComposed}
          to={{
            pathname: "/events/add",
          }}
          onClick={() => {
            setDisabled(true);
          }}
        >
          Add Event
        </LoadingButton>
      </Container>
      <Container sx={{ py: 2 }}>
        <EventsListContainer events={events} />
      </Container>
    </>
  );
};

export default EventsListPage;
