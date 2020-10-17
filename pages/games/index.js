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
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import GameDetails from "../../components/GameDetails";
import middleware from "../../middleware";
import Game from "../../models/Game";
import useGames from "../../util/useGames";

const ContainerWithMargin = styled(Container)({
  marginBottom: "1.5rem",
});

const GamesListPage = ({ initialData }) => {
  const [session] = useSession();
  const router = useRouter();
  const { games } = useGames(initialData);

  if (!session)
    return (
      <Container>
        <Typography variant="h3">
          You must be logged in to access this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={signIn}
        >
          Login/Register
        </Button>
      </Container>
    );

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
