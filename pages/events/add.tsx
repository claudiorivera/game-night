import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Game } from "@prisma/client";
import axios from "axios";
import { AlertContext } from "context/Alert";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useContext, useState } from "react";

import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const games = await prisma.game.findMany();

  return {
    props: { games: JSON.parse(JSON.stringify(games)) },
  };
};

type AddEventPageProps = {
  games: Game[];
};
const AddEventPage = ({ games }: AddEventPageProps) => {
  const router = useRouter();
  const { createAlertWithMessage } = useContext(AlertContext);
  const [dateTime, setDateTime] = useState<Date | null>(new Date());
  const [gameId, setGameId] = useState("");
  const [disabled, setDisabled] = useState(false);

  const addEvent = async (gameId: string, dateTime: Date | null) => {
    try {
      await axios.post("/api/events", {
        gameId,
        dateTime,
      });
    } catch (error) {
      createAlertWithMessage(JSON.stringify(error, null, 2));
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h4">Add New Event</Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setDisabled(true);
          await addEvent(gameId, dateTime);
          router.push("/events");
        }}
      >
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "100%" }}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Event Date and Time"
                value={dateTime}
                onChange={setDateTime}
              />
            </FormControl>
          </Grid>
          {!!games.length && (
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
                  {games.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <LoadingButton
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={disabled}
              loading={disabled}
            >
              Add Event
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddEventPage;
