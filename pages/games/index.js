import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { Fragment, useContext } from "react";
import GameDetails from "../../components/GameDetails";
import { AlertContext } from "../../context/Alert";
import middleware from "../../middleware";
import Game from "../../models/Game";
import useGames from "../../util/useGames";

const ContainerWithMargin = styled(Container)({
  marginBottom: "1.5rem",
});

const GamesListPage = ({ initialData }) => {
  const [session] = useSession();
  const { createAlertWithMessage } = useContext(AlertContext);
  const router = useRouter();
  const { games } = useGames(initialData);

  if (!session) {
    createAlertWithMessage("You must be signed in to access this page");
    router.push("/auth/login");
  }

  return (
    <Fragment>
      <ContainerWithMargin>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          onClick={() => {
            router.push("/games/add");
          }}
        >
          Add Game
        </Button>
      </ContainerWithMargin>
      <Container>
        {games
          ? games.map((game) => (
              <Accordion key={game.bggId}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${game.bggId}-content`}
                >
                  <Typography variant="h6">
                    {game.name} ({game.yearPublished})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Container>
                    <GameDetails game={game} />
                  </Container>
                </AccordionDetails>
              </Accordion>
            ))
          : ""}
      </Container>
    </Fragment>
  );
};

export default GamesListPage;

export const getServerSideProps = async ({ req, res }) => {
  await middleware.apply(req, res);
  const games = await Game.find().lean();
  return {
    props: {
      initialData: JSON.parse(JSON.stringify({ games })) || null,
    },
  };
};
