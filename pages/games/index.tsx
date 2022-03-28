import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { Game } from "@prisma/client";
import { GameDetails } from "components";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

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

type GamesListPageProps = {
  games: Game[];
};
const GamesListPage = ({ games }: GamesListPageProps) => {
  const router = useRouter();

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
