import GameDetails from "@components/GameDetails";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import middleware from "@middleware";
import Game from "@models/Game";
import useGames from "@util/useGames";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";

const GamesListPage = ({ initialData }) => {
  const router = useRouter();
  const { games } = useGames(initialData);
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
          onClick={signIn}
        >
          Login
        </Button>
      </>
    );

  return (
    <Container>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        size="large"
        onClick={() => {
          router.push("/games/add");
        }}
        style={{ marginBottom: "1rem" }}
      >
        Add Game
      </Button>
      {games &&
        games.map((game) => (
          <Accordion key={game.bggId} square>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${game.bggId}-content`}
            >
              <Typography variant="h6">
                {game.name} ({game.yearPublished})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GameDetails game={game} />
            </AccordionDetails>
          </Accordion>
        ))}
    </Container>
  );
};

export default GamesListPage;

export const getServerSideProps = async ({ req, res }) => {
  await middleware.run(req, res);
  const games = await Game.find().lean();
  return {
    props: {
      initialData: JSON.parse(JSON.stringify({ games })) || null,
    },
  };
};
