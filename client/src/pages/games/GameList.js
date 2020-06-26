import React, { useContext, useEffect } from "react";
import { GamesContext } from "./context";
import { GameDetails } from "./";
import {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const GameList = () => {
  const classes = useStyles();
  const { getGamesList, games } = useContext(GamesContext);

  useEffect(() => {
    const fetchGames = async () => {
      await getGamesList();
    };
    fetchGames();
    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Typography variant="h3">Games List</Typography>
      <Link to={"/games/add"}>Add Game</Link>
      {games &&
        games.map((game) => (
          <ExpansionPanel key={game.bggId}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${game.bggId}-content`}
            >
              <Typography className={classes.heading}>
                {game.name} ({game.yearPublished})
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <GameDetails game={game} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </Container>
  );
};

export default GameList;
