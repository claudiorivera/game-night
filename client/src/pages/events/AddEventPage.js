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
import { makeStyles } from "@material-ui/core/styles";
import { DateTimePicker } from "@material-ui/pickers";
import { useHistory } from "react-router-dom";

const AddEventPage = () => {
  const { games, getAllGames } = useContext(GamesContext);
  const { addEvent } = useContext(EventsContext);
  const [eventDateTime, setEventDateTime] = useState(new Date());
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      await getAllGames();
    };
    fetchGames();
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
      <Typography variant="h4">Add New Event</Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addEvent(gameId, eventDateTime);
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
          Add Event
        </Button>
      </form>
    </Container>
  );
};

export default AddEventPage;
