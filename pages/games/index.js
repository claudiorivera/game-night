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
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import GameDetails from "../../components/GameDetails";
import useGames from "../../util/useGames";
import { useSession } from "next-auth/client";

const ContainerWithMargin = styled(Container)({
  marginBottom: "1.5rem",
});

const GamesListPage = () => {
  const [session] = useSession();
  const router = useRouter();
  const { games } = useGames();

  if (!session)
    return (
      <Container>
        <Typography variant="h3">
          You must be logged in to access this page.
        </Typography>
        <Link href="/api/auth/signin">
          <Button
            type="submit"
            size="large"
            fullWidth
            color="secondary"
            variant="contained"
          >
            Login/Register
          </Button>
        </Link>
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
