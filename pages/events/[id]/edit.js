import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { DateTimePicker } from "@material-ui/pickers";
import axios from "axios";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import Game from "../../../models/Game";

const StyledFormControl = styled(FormControl)({
  margin: "1rem",
});

const EditEventPage = ({ event, games }) => {
  const router = useRouter();
  const eventId = router.query.id;
  const [eventDateTime, setEventDateTime] = useState(event.eventDateTime);
  const [gameId, setGameId] = useState(event.eventGame._id);
  const [session] = useSession();

  if (!session)
    return (
      <Container>
        <Typography variant="h5" align="center">
          You must be logged in to view this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={signIn}
        >
          Login
        </Button>
      </Container>
    );

  const updateEvent = async () => {
    await axios.put(`/api/events/${eventId}?action=edit`, {
      gameId,
      eventDateTime,
    });
    router.back();
  };

  return (
    <Container>
      <Button onClick={() => router.back()}>
        <ArrowBackIcon />
        Go Back
      </Button>
      <Typography variant="h4">Edit Event</Typography>
      {event ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateEvent(eventId, gameId, eventDateTime);
            router.back();
          }}
        >
          <StyledFormControl>
            <DateTimePicker
              disablePast
              id="datetime-picker"
              minutesStep={15}
              value={eventDateTime}
              onChange={setEventDateTime}
            />
          </StyledFormControl>
          {games && (
            <StyledFormControl>
              <Select
                id="game-select"
                value={gameId}
                onChange={(e) => {
                  setGameId(e.target.value);
                }}
              >
                {games.map(({ _id, name }) => (
                  <MenuItem key={_id} value={_id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          )}
          <Button
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </form>
      ) : (
        ""
      )}
    </Container>
  );
};

export default EditEventPage;

export const getServerSideProps = async ({ req, res, params }) => {
  await middleware.apply(req, res);
  const event = await Event.findById(params.id).lean();
  const games = await Game.find().lean();
  return {
    props: {
      event: JSON.parse(JSON.stringify(event)) || null,
      games: JSON.parse(JSON.stringify(games)) || null,
    },
  };
};
