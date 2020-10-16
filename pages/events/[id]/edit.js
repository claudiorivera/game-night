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
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import middleware from "../../../middleware";
import Event from "../../../models/Event";
import Game from "../../../models/Game";
import useEvent from "../../../util/useEvent";
import useGames from "../../../util/useGames";

const StyledFormControl = styled(FormControl)({
  margin: "1rem",
});

const EditEventPage = ({ initialEventData, initialGamesData }) => {
  const [session] = useSession();
  const router = useRouter();
  const eventId = router.query.id;
  const { event, eventMutate } = useEvent(eventId, initialEventData);
  const { games } = useGames(initialGamesData);
  const [eventDateTime, setEventDateTime] = useState(event.eventDateTime);
  const [gameId, setGameId] = useState("");

  if (!session)
    return (
      <Container>
        <Typography variant="h3">
          You must be logged in to access this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Login/Register
        </Button>
      </Container>
    );

  const updateEvent = async () => {
    await axios.put(`/api/events/${eventId}?action=edit`, {
      gameId,
      eventDateTime,
    });
    eventMutate();
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
      initialEventData: JSON.stringify(event) || null,
      initialGamesData: JSON.stringify(games) || null,
    },
  };
};
