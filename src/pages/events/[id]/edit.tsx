import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
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

const EditEventPage = () => {
  const router = useRouter();
  const { createSuccessMessage, createErrorMessage } =
    useContext(SnackbarContext);

  const { data: event } = api.event.getById.useQuery(
    {
      id: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
      onSuccess: (data) => {
        if (!data) return;

        setDateTime(dayjs(data.dateTime));
        setGameId(data.game.id);
      },
    }
  );

  const [dateTime, setDateTime] = useState<Dayjs | null>(dayjs(new Date()));
  const [gameId, setGameId] = useState<string>("");

  const { mutate: updateEvent, isLoading: disabled } =
    api.event.updateById.useMutation({
      onSuccess: () => {
        createSuccessMessage("Event updated successfully");
        router.back();
      },
    });

  const { data: games } = api.game.getAll.useQuery();

  if (!event || !games) return null;

  return (
    <>
      <Button onClick={() => router.back()}>
        <ArrowBackIcon />
        Go Back
      </Button>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Edit Event
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateEvent({
            id: event.id,
            data: {
              dateTime: dateTime?.toDate() || new Date(),
              gameId,
            },
          });
        }}
      >
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "100%" }}>
              <DateTimePicker
                disablePast
                value={dateTime}
                onChange={setDateTime}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: "100%" }}>
              <Select
                id="game-select"
                value={gameId}
                onChange={(e) => {
                  setGameId(e.target.value);
                }}
              >
                <MenuItem value="">Select A Game</MenuItem>
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
              color="primary"
              type="submit"
              disabled={disabled}
              loading={disabled}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EditEventPage;
