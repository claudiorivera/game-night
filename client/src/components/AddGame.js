import React, { useState, Fragment, useContext } from "react";
import { GlobalContext } from "../context";
import { Button, TextField } from "@material-ui/core";
import { GameDetails } from "../components";
import bggGameFetchById from "../util/bggGameFetchById";
import { useHistory } from "react-router-dom";

const AddGame = () => {
  const history = useHistory();
  const [gameDetails, setGameDetails] = useState(null);
  const [formBggIdInput, setFormBggIdInput] = useState(null);
  const { addGame } = useContext(GlobalContext);

  const handleAddGame = async () => {
    await addGame({ ...gameDetails });
    history.push("/games");
  };

  const handleSearch = async () => {
    const fetchedGame = await bggGameFetchById(parseInt(formBggIdInput));
    setGameDetails(fetchedGame);
  };

  return (
    <Fragment>
      <TextField
        type="number"
        label="Enter BGG Id"
        onChange={(e) => {
          setFormBggIdInput(parseInt(e.target.value) ? e.target.value : null);
        }}
      />
      <Button
        disabled={formBggIdInput === null}
        variant="contained"
        color="primary"
        onClick={handleSearch}
      >
        Search
      </Button>
      <Button
        disabled={gameDetails === null}
        variant="contained"
        color="primary"
        onClick={handleAddGame}
      >
        Add Game
      </Button>
      <hr />
      {/* Display game details if we got any */}
      {gameDetails && <GameDetails game={gameDetails} />}
    </Fragment>
  );
};

export default AddGame;
