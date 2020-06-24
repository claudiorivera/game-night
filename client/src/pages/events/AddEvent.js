import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
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
// import MomentUtils from "@date-io/moment";
import { useHistory } from "react-router-dom";

const AddEvent = () => {
  const { games, getGamesList, addEvent } = useContext(GlobalContext);
  const [eventDateTime, setEventDateTime] = useState(new Date());
  const [gameId, setGameId] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      await getGamesList();
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
      <Typography variant="h3">Add New Event</Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsFetching(true);
          await addEvent(gameId, eventDateTime);
          history.push("/events");
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
          disabled={isFetching}
        >
          Add Event
        </Button>
      </form>
    </Container>
  );
};

export default AddEvent;
