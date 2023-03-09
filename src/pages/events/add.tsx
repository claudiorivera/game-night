import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { useContext, useState } from "react";

import { SnackbarContext } from "~/context/Snackbar";
import { api } from "~/lib/api";
import { authOptions } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const AddEventPage = () => {
  const router = useRouter();
  const { createErrorMessage, createSuccessMessage } =
    useContext(SnackbarContext);
  const [dateTime, setDateTime] = useState<Dayjs | null>(dayjs());
  const [gameId, setGameId] = useState("");

  const { data: games } = api.game.getAll.useQuery();

  const { mutate: addEvent, isLoading: disabled } =
    api.event.create.useMutation({
      onError: (error) => {
        createErrorMessage(error.message);
      },
      onSuccess: () => {
        createSuccessMessage("Event created!");
        router.push("/events");
      },
    });

  if (!games) return null;

  return (
    <>
      <Typography variant="h4">Add New Event</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addEvent({ gameId, dateTime: dateTime?.toDate() || new Date() });
        }}
      >
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "100%" }}>
              <DateTimePicker
                label="Event Date and Time"
                value={dateTime}
                onChange={setDateTime}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="select-game-label">Select Game</InputLabel>
              <Select
                id="select-game"
                value={gameId}
                label="Select Game"
                labelId="select-game-label"
                onChange={(e) => {
                  setGameId(e.target.value);
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
          <Grid item xs={12}>
            <LoadingButton
              size="large"
              fullWidth
              variant="contained"
              color="secondary"
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
