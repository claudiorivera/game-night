import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import GameDetails from "../../components/GameDetails";
import { AlertContext } from "../../context/Alert";
import { GamesContext } from "../../context/Games";
import { bggFetchGamesByQuery } from "../../util/bggFetchGamesByQuery";

const StyledAccordionDetails = styled(AccordionDetails)({
  display: "flex",
  flexDirection: "column",
});

const AddGame = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const { addGame } = useContext(GamesContext);
  const { clearAlert } = useContext(AlertContext);

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
              <Typography>
                {result.name} ({result.yearPublished})
              </Typography>
            </AccordionSummary>
            <StyledAccordionDetails>
              <Container>
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
                    router.push("/games");
                  }}
                >
                  Add This Game
                </Button>
              </Container>
            </StyledAccordionDetails>
          </Accordion>
        ))}
    </Container>
  );
};

export default AddGame;
