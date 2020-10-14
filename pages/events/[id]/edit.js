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
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useGames from "../../../util/useGames";

const useStyles = makeStyles({
  margin: {
    margin: "10px",
  },
});

const EditEventPage = () => {
  const router = useRouter();
  const classes = useStyles();
  const { games } = useGames();
  const [eventDateTime, setEventDateTime] = useState(Date.now());
  const [gameId, setGameId] = useState("");
  const [event, setEvent] = useState(null);
  const eventId = router.query;
  const [session] = useSession();

  if (!session)
    return (
      <Container>
        <Typography variant="h3">
          You must be logged in to access this page.
        </Typography>
        <Link href="/api/auth/signin">
          <Button
            type="submit"
            size="large"
            fullWidth
            color="secondary"
            variant="contained"
          >
            Login/Register
          </Button>
        </Link>
      </Container>
    );

  useEffect(() => {
    getEventById(eventId);
  }, []);

  const getEventById = async (id) => {
    const response = await axios.get(`/api/events/${id}`);
    setEvent(response.data.event);
  };

  const updateEvent = () => {
    console.log("updateEvent");
  };

  return (
    <Container>
      <Button onClick={() => router.back()}>
        <ArrowBackIcon />
        Go Back
      </Button>
      <Typography variant="h4">Edit Event</Typography>
      {event && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateEvent(eventId, gameId, eventDateTime);
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
