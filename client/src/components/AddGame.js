import React, { useState, useContext } from "react";
import { GlobalContext } from "../context";
import {
  Button,
  TextField,
  Container,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import { GameDetails } from "../components";
import { bggFetchGameByQuery } from "../util/bggFetchGameByQuery";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
}));

const AddGame = () => {
  const classes = useStyles();
  const history = useHistory();
  const [gameDetails, setGameDetails] = useState(null);
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
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
    setQueryResults([game]); // Temporary, while prototyping
    setIsFetching(false);
    setAlert(null);
  };

  const handleQueryChange = async (e) => {
    setQuery(e.target.value);
  };

  return (
    <Container>
      {alert && (
        <div className={classes.alert}>
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
      {queryResults.length > 0 &&
        !isFetching &&
        queryResults.map((result) => (
          <ExpansionPanel key={result.bggId}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${result.bggId}-content`}
            >
              <Typography className={classes.heading}>{result.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <GameDetails game={gameDetails} />
              <Button
                fullWidth
                size="large"
                color="primary"
                variant="contained"
                onClick={handleAddGame}
              >
                Add This Game
              </Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </Container>
  );
};

export default AddGame;
