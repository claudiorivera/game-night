import React, { useState, useContext, Fragment } from "react";
import { GlobalContext } from "../context";
import {
  Button,
  TextField,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

import { GameDetails } from "../components";
import { bggFetchGameByQuery } from "../util/bggFetchGameByQuery";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AddGame = () => {
  const classes = useStyles();
  const history = useHistory();
  const [gameDetails, setGameDetails] = useState(null);
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [alert, setAlert] = useState(null);
  const { addGame } = useContext(GlobalContext);

  const handleAddGame = async () => {
    await addGame({ ...gameDetails });
    history.push("/games");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    const game = await bggFetchGameByQuery(query);
    if (game.bggId === 0) {
      setIsFetching(false);
      setGameDetails(null);
      setAlert("No game found with that exact name. Please try again.");
      return;
    }
    setGameDetails(game);
    setIsFetching(false);
    setAlert(null);
  };

  const handleQueryChange = async (e) => {
    setQuery(e.target.value);
  };

  return (
    <Container>
      {alert && (
        <div className={classes.root}>
          <Alert
            onClose={() => {
              setAlert(null);
            }}
            severity="warning"
          >
            <AlertTitle>Alert</AlertTitle>
            {alert}
          </Alert>
        </div>
      )}
      <form onSubmit={handleSearch}>
        <TextField
          name="query"
          id="query"
          label="Search for game to add"
          placeholder="Enter a boardgame name to search for"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={query}
          onChange={handleQueryChange}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Search
        </Button>
      </form>
      {/* Display game details if we got any */}
      {isFetching && <CircularProgress />}
      {!isFetching && gameDetails && gameDetails.bggId !== 0 && (
        <Fragment>
          <GameDetails game={gameDetails} />
          <Button
            size="large"
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleAddGame}
          >
            Add This Game
          </Button>
        </Fragment>
      )}
    </Container>
  );
};

export default AddGame;
