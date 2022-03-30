import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import { Game } from "@prisma/client";
import { GameDetails, NextLinkComposed } from "components";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";

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
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Container sx={{ marginBottom: "1rem" }}>
        <LoadingButton
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          disabled={disabled}
          loading={disabled}
          component={NextLinkComposed}
          to={{
            pathname: "/games/add",
          }}
          onClick={() => {
            setDisabled(true);
          }}
        >
          Add Game
        </LoadingButton>
      </Container>
      <Container>
        {games.map((game) => (
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
    </>
  );
};

export default GamesListPage;
