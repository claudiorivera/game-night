import React, { useState, useEffect, Fragment } from "react";
import { GameDetails } from "../components";
import { CircularProgress, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

const axios = require("axios").default;

const GameList = () => {
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

  if (isFetching) return <CircularProgress />;
  return (
    <Fragment>
      <Link to={"/games/add"}>Add Game</Link>
      {gamesList.map((game) => (
        <Fragment>
          <GameDetails game={game} key={game._id} />
          <Divider />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default GameList;
