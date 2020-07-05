import React, { useContext, useEffect, useState } from "react";
import { GamesContext } from "../games/context";
import { EventsContext } from "./context";
import {
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { DateTimePicker } from "@material-ui/pickers";
import { useHistory, useParams } from "react-router-dom";

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
    //eslint-disable-next-line
  }, []);

  const useStyles = makeStyles({
    margin: {
      margin: "10px",
    },
  });

  const classes = useStyles();
  const history = useHistory();

  return (
    <Container>
      <Button onClick={() => history.goBack()}>
        <ArrowBackIcon />
        Go Back
      </Button>
      <Typography variant="h4">Edit Event</Typography>
      {event && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await updateEvent(eventId, gameId, eventDateTime);
            history.goBack();
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
