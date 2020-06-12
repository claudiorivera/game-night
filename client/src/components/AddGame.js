import React, { useState, Fragment, useContext } from "react";
import { GlobalContext } from "../context";
import { Button, TextField } from "@material-ui/core";
import { GameDetails } from "../components";
import bggGameFetchById from "../util/bggGameFetchById";
import bggIdFetchByQuery from "../util/bggIdFetchByQuery";
import { useHistory } from "react-router-dom";

const AddGame = () => {
  const history = useHistory();
  const [gameDetails, setGameDetails] = useState(null);
  const [formBggIdInput, setFormBggIdInput] = useState(null);
  const [formBggQueryInput, setFormBggQueryInput] = useState("");
  const { addGame } = useContext(GlobalContext);

  const handleAddGame = async () => {
    await addGame({ ...gameDetails });
    history.push("/games");
  };

  const handleSearchById = async () => {
    const fetchedGame = await bggGameFetchById(parseInt(formBggIdInput));
    setGameDetails(fetchedGame);
  };

  const handleSearchByName = async () => {
    const fetchedGame = await bggIdFetchByQuery(formBggQueryInput);
    console.log(fetchedGame);
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
        onClick={handleSearchById}
      >
        Search
      </Button>
      <hr />
      <TextField
        type="text"
        label="Search for a boardgame name"
        onChange={(e) => {
          setFormBggQueryInput(e.target.value);
        }}
      />
      <Button
        disabled={formBggQueryInput.length === 0}
        variant="contained"
        color="primary"
        onClick={handleSearchByName}
      >
        Search
      </Button>

      <hr />
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
