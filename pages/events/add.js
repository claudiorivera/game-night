import { AlertContext } from "@context/Alert";
import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { DateTimePicker } from "@material-ui/pickers";
import middleware from "@middleware";
import Game from "@models/Game";
import useGames from "@util/useGames";
import axios from "axios";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const StyledFormControl = styled(FormControl)({
  margin: "10px",
});

const AddEventPage = ({ initialData }) => {
  const router = useRouter();
  const { createAlertWithMessage } = useContext(AlertContext);
  const { games } = useGames(initialData);
  const [eventDateTime, setEventDateTime] = useState(new Date());
  const [gameId, setGameId] = useState("");
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

  const addEvent = async (gameId, eventDateTime) => {
    try {
      const response = await axios.post("/api/events", {
        gameId,
        eventDateTime,
      });
      createAlertWithMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Add New Event</Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addEvent(gameId, eventDateTime);
          router.push("/events");
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
          Add Event
        </Button>
      </form>
    </Container>
  );
};

export default AddEventPage;

export const getServerSideProps = async ({ req, res }) => {
  await middleware.run(req, res);
  const games = await Game.find().lean();
  return {
    props: {
      initialData: JSON.parse(JSON.stringify({ games })) || null,
    },
  };
};
