import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import DatePicker from "@mui/lab/DatePicker";
import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import middleware from "middleware";
import { EventModel, GameModel } from "models";
import { Types } from "mongoose";
import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IEvent, IGame } from "types";

interface Props {
  event: IEvent;
  games: IGame[];
}

const EditEventPage = ({ event, games }: Props) => {
  const game = event.eventGame as IGame;
  const router = useRouter();
  const eventId = router.query.id;
  const [eventDateTime, setEventDateTime] = useState<Date | unknown>(
    new Date()
  );
  const [gameId, setGameId] = useState<Types.ObjectId | unknown>(game._id);
  const [session] = useSession();

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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  await middleware.run(req, res);
  const event = (await EventModel.findById(params?.id)
    .populate("eventGame")
    .lean()) as IEvent;
  const games = (await GameModel.find().lean()) as IGame[];
  return {
    props: {
      event: JSON.parse(JSON.stringify(event)) || null,
      games: JSON.parse(JSON.stringify(games)) || [],
    },
  };
};
