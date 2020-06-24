import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import {
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const AddEvent = () => {
  const { games, getGamesList, addEvent } = useContext(GlobalContext);
  const [eventDateTime, setEventDateTime] = useState(new Date());
  const [eventGameId, setEventGameId] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      await getGamesList();
    };
    fetchGames();
    //eslint-disable-next-line
  }, []);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container>
        <Typography variant="h3">Add New Event</Typography>
        <FormControl>
          <DateTimePicker
            label="Event Date/Time"
            inputVariant="outlined"
            minutesStep="15"
            value={eventDateTime}
            onChange={setEventDateTime}
          />
          {games && (
            <Select value={0} variant="outlined" label="Select a Game">
              <MenuItem value={0}>Select a Game</MenuItem>
              {games.map((game) => (
                <MenuItem
                  key={game._id}
                  value={game._id}
                  onChange={() => {
                    setEventGameId(game._id);
                  }}
                >
                  {game.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </Container>
    </MuiPickersUtilsProvider>
  );
};

export default AddEvent;
