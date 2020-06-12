import React, { useState, useEffect, Fragment } from "react";
import { GameDetails, AddGame } from "../components";
import { CircularProgress } from "@material-ui/core";
import { useRouteMatch, Link, Switch, Route } from "react-router-dom";

const axios = require("axios").default;

const GameList = () => {
  const { path, url } = useRouteMatch();

  const [gamesList, setGamesList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

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
      <Switch>
        <Route exact path={path}>
          <h3>Game Options</h3>
        </Route>
        <Route path={`${path}/add`}>
          <AddGame />
        </Route>
      </Switch>
      <Link to={`${url}/add`}>Add Game</Link>
      {gamesList.map((game) => (
        <GameDetails game={game} key={game._id} />
      ))}
    </Fragment>
  );
};

export default GameList;
