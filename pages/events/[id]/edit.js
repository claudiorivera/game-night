import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { DateTimePicker } from "@material-ui/pickers";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { EventsContext } from "../../../context/Events";
import { GamesContext } from "../../../context/Games";

const EditEventPage = () => {
  const { games, getAllGames } = useContext(GamesContext);
  const { getEventById, updateEvent } = useContext(EventsContext);
  const { eventId } = useParams();
  const [eventDateTime, setEventDateTime] = useState(Date.now());
  const [gameId, setGameId] = useState("");
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      if (!games) {
        await getAllGames();
      }
    };
    const fetchEvent = async () => {
      const event = await getEventById(eventId);
      setEventDateTime(event.eventDateTime);
      setGameId(event.game._id);
      setEvent(event);
    };
    fetchGames();
    fetchEvent();
  }, []);

  const useStyles = makeStyles({
    margin: {
      margin: "10px",
    },
  });

  const classes = useStyles();
  const router = useRouter();

  return (
    <Container>
      <Button onClick={() => router.back()}>
        <ArrowBackIcon />
        Go Back
      </Button>
      <Typography variant="h4">Edit Event</Typography>
      {event && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await updateEvent(eventId, gameId, eventDateTime);
            router.back();
          }}
        >
          <FormControl className={classes.margin}>
            <DateTimePicker
              disablePast
              id="datetime-picker"
              minutesStep={15}
              value={eventDateTime}
              onChange={setEventDateTime}
            />
          </FormControl>
          {games && (
            <FormControl className={classes.margin}>
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
            </FormControl>
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
      )}
    </Container>
  );
};

export default EditEventPage;
