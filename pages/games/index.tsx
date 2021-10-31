import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { GameDetails } from "components";
import useGames from "hooks/useGames";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { IGame } from "types";

const GamesListPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { games, isLoading } = useGames();

  if (!session)
    return (
      <>
        <Typography variant="h5" align="center">
          You must be signed in to view this page.
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
          Sign In
        </Button>
      </>
    );

  if (isLoading) return <CircularProgress />;

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
        sx={{ marginBottom: "1rem" }}
      >
        Add Game
      </Button>
      {games.map((game: IGame) => (
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
