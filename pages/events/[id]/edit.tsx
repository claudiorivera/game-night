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
import { Game } from "@prisma/client";
import axios from "axios";
import { eventSelect } from "lib/api";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { PopulatedEvent } from "types";

import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  if (params?.id) {
    const event = await prisma.event.findUnique({
      where: { id: +params.id },
      select: eventSelect,
    });

    const games = await prisma.game.findMany();

    return {
      props: {
        event: JSON.parse(JSON.stringify(event)),
        games: JSON.parse(JSON.stringify(games)),
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

type EditEventPageProps = {
  event: PopulatedEvent;
  games: Game[];
};
const EditEventPage = ({ event, games }: EditEventPageProps) => {
  const router = useRouter();
  const [eventDateTime, setEventDateTime] = useState<Date | unknown>(
    new Date()
  );
  const [gameId, setGameId] = useState(event.game.id);

  const updateEvent = async () => {
    await axios.put(`/api/events/${event.id}?action=edit`, {
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
      {event && (
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
                      setGameId(+e.target.value);
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
      )}
    </Container>
  );
};

export default EditEventPage;
