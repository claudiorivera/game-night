import React, { useState, useEffect, Fragment } from "react";
import { GameDetails } from "../components";
import { CircularProgress } from "@material-ui/core";

const axios = require("axios").default;

const GameList = () => {
  const [gamesList, setGamesList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getGamesList = async () => {
    setIsFetching(true);
    const { data: games } = await axios.get("/api/games");
    setGamesList(games);
    setIsFetching(false);
  };

  // Fetch game details on component render
  useEffect(() => {
    getGamesList();
  }, []);

  if (isFetching) return <CircularProgress />;
  return (
    <Fragment>
      {gamesList.map((game) => (
        <GameDetails game={game} key={game.id} />
      ))}
    </Fragment>
  );
};

export default GameList;
