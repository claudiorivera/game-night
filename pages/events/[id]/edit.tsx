import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { DateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import axios from "axios";
import middleware from "middleware";
import { EventModel, GameModel } from "models";
import moment from "moment";
import { Types } from "mongoose";
import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { IEvent, IGame } from "types";

const StyledFormControl = styled(FormControl)({
  margin: "1rem",
});

interface Props {
  event: IEvent;
  games: IGame[];
}

const EditEventPage = ({ event, games }: Props) => {
  const game = event.eventGame as IGame;
  const router = useRouter();
  const eventId = router.query.id;
  const [eventDateTime, setEventDateTime] =
    useState<MaterialUiPickersDate | null>(moment(event.eventDateTime));
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
      <Typography variant="h4">Edit Event</Typography>
      {event ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateEvent();
            router.back();
          }}
        >
          <StyledFormControl>
            <DateTimePicker
              disablePast
              id="datetime-picker"
              minutesStep={15}
              value={eventDateTime}
              onChange={(e) => {
                setEventDateTime(e);
              }}
            />
          </StyledFormControl>
          {games && (
            <StyledFormControl>
              <Select
                id="game-select"
                value={gameId}
                onChange={(e: ChangeEvent<{ value: unknown }>) => {
                  setGameId(e.target.value);
                }}
              >
                {games.map(({ _id, name }) => (
                  <MenuItem key={String(_id)} value={String(_id)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
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
