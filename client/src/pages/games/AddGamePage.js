import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GamesContext } from "./context";
import { AppContext } from "../../App/context";
import GameDetails from "./components/GameDetails";
import { bggFetchGamesByQuery } from "../../lib/bggFetchGamesByQuery";
import {
  Button,
  TextField,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

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
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const { addGame } = useContext(GamesContext);
  const { clearAlert } = useContext(AppContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await bggFetchGamesByQuery(query);
    setQueryResults(results);
    clearAlert();
  };

  const handleQueryChange = async (e) => {
    setQuery(e.target.value);
  };

  return (
    <Container>
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
      {queryResults &&
        queryResults.map((result) => (
          <Accordion key={result.bggId}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${result.bggId}-content`}
            >
              <Typography className={classes.heading}>
                {result.name} ({result.yearPublished})
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <GameDetails game={result} />
              <Button
                fullWidth
                size="large"
                color="primary"
                variant="contained"
                onClick={async () => {
                  await addGame({
                    bggId: result.bggId,
                    imageSrc: result.imageSrc,
                    thumbnailSrc: result.thumbnailSrc,
                    description: result.description,
                    yearPublished: result.yearPublished,
                    minPlayers: result.minPlayers,
                    maxPlayers: result.maxPlayers,
                    playingTime: result.playingTime,
                    minAge: result.minAge,
                    rating: result.rating,
                    numOfRatings: result.numOfRatings,
                    name: result.name,
                    authors: result.authors,
                    categories: result.categories,
                    gameMechanics: result.gameMechanics,
                  });
                  history.push("/games");
                }}
              >
                Add This Game
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
    </Container>
  );
};

export default AddGame;
