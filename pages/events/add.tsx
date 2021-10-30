import DateTimePicker from "@mui/lab/DateTimePicker";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { AlertContext } from "context/Alert";
import useGames from "hooks/useGames";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const AddEventPage = () => {
  const { games: allGames, isLoading } = useGames();
  const router = useRouter();
  const { createAlertWithMessage } = useContext(AlertContext);
  const [eventDateTime, setEventDateTime] = useState<Date | unknown>(
    new Date()
  );
  const [gameId, setGameId] = useState("");
  const { data: session } = useSession();

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
          onClick={() => signIn()}
        >
          Login
        </Button>
      </>
    );

  if (isLoading) return <CircularProgress />;
  if (!createAlertWithMessage) return null;

  const addEvent = async (gameId: string, eventDateTime: string) => {
    try {
      const response = await axios.post<any>("/api/events", {
        gameId,
        eventDateTime,
      });
      createAlertWithMessage(response.data.message);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h4">Add New Event</Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addEvent(gameId, String(eventDateTime));
          router.push("/events");
        }}
      >
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "100%" }}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Event Date and Time"
                value={eventDateTime}
                onChange={setEventDateTime}
              />
            </FormControl>
          </Grid>
          {!!allGames?.length && (
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="select-game-label">Select Game</InputLabel>
                <Select
                  id="select-game"
                  value={gameId}
                  label="Select Game"
                  labelId="select-game-label"
                  onChange={(e) => {
                    setGameId(e.target.value as string);
                  }}
                >
                  {allGames.map(({ _id, name }) => (
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
              Add Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddEventPage;
