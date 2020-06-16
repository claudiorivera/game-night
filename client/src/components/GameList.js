import React, { useState, useEffect } from "react";
import { GameDetails } from "../components";
import {
  CircularProgress,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const GameList = () => {
  const classes = useStyles();
  const [gamesList, setGamesList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const getGamesList = async () => {
    const { data: games } = await axios.get("/api/games");
    setGamesList(games);
    setIsFetching(false);
  };

  // Fetch game details on component render
  useEffect(() => {
    getGamesList();
  }, []);

  return isFetching ? (
    <CircularProgress />
  ) : (
    <Container>
      <Link to={"/games/add"}>Add Game</Link>
      {gamesList.map((game) => (
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
