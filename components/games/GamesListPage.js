import React, { useContext, useEffect, Fragment } from "react";
import { GamesContext } from "./context";
import GameDetails from "./components/GameDetails";
import {
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  mb: {
    marginBottom: "1.5rem",
  },
}));

const GameList = () => {
  const classes = useStyles();
  const { getAllGames, games } = useContext(GamesContext);
  const history = useHistory();

  useEffect(() => {
    const fetchGames = async () => {
      await getAllGames();
    };
    fetchGames();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Container className={classes.mb}>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          size="large"
          onClick={() => {
            history.push("/games/add");
          }}
        >
          Add Game
        </Button>
      </Container>
      <Container>
        {games
          ? games.map((game) => (
              <Accordion key={game.bggId}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${game.bggId}-content`}
                >
                  <Typography className={classes.heading}>
                    {game.name} ({game.yearPublished})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
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

export default GameList;
