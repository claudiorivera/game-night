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
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { GamesContext } from "../context/Games";
import { EventsContext } from "../context/Events";

const StyledFormControl = styled(FormControl)({
  margin: "10px",
});

const AddEventPage = () => {
  const router = useRouter();
  const { games, getAllGames } = useContext(GamesContext);
  const { addEvent } = useContext(EventsContext);
  const [eventDateTime, setEventDateTime] = useState(new Date());
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      if (!games) {
        await getAllGames();
      }
    };
    fetchGames();
  }, []);

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
