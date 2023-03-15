import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";

import { GameDetails, NextLinkComposed } from "~/components";
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

const GamesListPage = () => {
  const { data: games, isLoading: disabled } = api.game.getAll.useQuery();

  return (
    <>
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
      >
        Add Game
      </LoadingButton>
      {games?.map((game) => (
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
    </>
  );
};

export default GamesListPage;
