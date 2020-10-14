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
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import GameDetails from "../../components/GameDetails";
import useGames from "../../util/useGames";

const ContainerWithMargin = styled(Container)({
  marginBottom: "1.5rem",
});

const GamesListPage = () => {
  const router = useRouter();
  const { games } = useGames();

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
