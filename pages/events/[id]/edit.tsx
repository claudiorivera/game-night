import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import DatePicker from "@mui/lab/DatePicker";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import useEvent from "hooks/useEvent";
import useGames from "hooks/useGames";
import { Types } from "mongoose";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const EditEventPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const eventId = router.query.id as string;
  const { event, isLoading: eventIsLoading } = useEvent(eventId);
  const { games, isLoading: gamesIsLoading } = useGames();

  const [eventDateTime, setEventDateTime] = useState<Date | unknown>(
    new Date()
  );
  const [gameId, setGameId] = useState<Types.ObjectId | unknown>(
    event?.eventGame?._id
  );

  const isLoading = eventIsLoading || gamesIsLoading;

  if (!session)
    return (
      <>
        <Typography variant="h5" align="center">
          You must be logged in to view this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={() => {
            signIn();
          }}
        >
          Login
        </Button>
      </>
    );

  if (isLoading) return <CircularProgress />;

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
      <Typography variant="h4" sx={{ marginTop: "1rem" }}>
        Edit Event
      </Typography>
      {event ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateEvent();
            router.back();
          }}
        >
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ width: "100%" }}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  disablePast
                  value={eventDateTime}
                  onChange={setEventDateTime}
                />
              </FormControl>
            </Grid>
            {games && (
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    id="game-select"
                    value={gameId}
                    onChange={(e) => {
                      setGameId(e.target.value);
                    }}
                  >
                    {games.map(({ _id, name }) => (
                      <MenuItem key={String(_id)} value={String(_id)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        ""
      )}
    </Container>
  );
};

export default EditEventPage;
