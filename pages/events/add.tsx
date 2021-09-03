import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { DateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import axios from "axios";
import { AlertContext } from "context/Alert";
import middleware from "middleware";
import { GameModel } from "models";
import moment from "moment";
import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { IGame } from "types";

const StyledFormControl = styled(FormControl)({
  margin: "10px",
});

interface Props {
  allGames: IGame[];
}

const AddEventPage = ({ allGames }: Props) => {
  const router = useRouter();
  const { createAlertWithMessage } = useContext(AlertContext);
  const [eventDateTime, setEventDateTime] =
    useState<MaterialUiPickersDate | null>(moment());
  const [gameId, setGameId] = useState("");
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
          onClick={() => signIn()}
        >
          Login
        </Button>
      </>
    );

  if (!createAlertWithMessage) return null;

  const addEvent = async (gameId: string, eventDateTime: string) => {
    try {
      const response = await axios.post("/api/events", {
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
        <StyledFormControl>
          <DateTimePicker
            disablePast
            id="datetime-picker"
            minutesStep={15}
            value={eventDateTime}
            onChange={setEventDateTime}
          />
        </StyledFormControl>
        {!!allGames.length && (
          <StyledFormControl>
            <Select
              id="game-select"
              value={gameId}
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
          </StyledFormControl>
        )}
        <Button
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Event
        </Button>
      </form>
    </>
  );
};

export default AddEventPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await middleware.run(req, res);
  const allGames = (await GameModel.find().lean()) as IGame[];
  return {
    props: JSON.parse(JSON.stringify({ allGames })) || [],
  };
};
