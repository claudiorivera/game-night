import GameDetails from "@components/GameDetails";
import { AlertContext } from "@context/Alert";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { Game } from "@models/Game";
import { BGGGameResponse } from "@util/bggFetchGameById";
import { bggFetchGamesByQuery } from "@util/bggFetchGamesByQuery";
import axios from "axios";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const StyledAccordionDetails = styled(AccordionDetails)({
  display: "flex",
  flexDirection: "column",
});

const StyledButton = styled(Button)({
  margin: "1rem 0",
});

const AddGamePage = () => {
  const router = useRouter();
  const { clearAlert, createAlertWithMessage } = useContext(AlertContext);
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState<BGGGameResponse[] | null>(
    null
  );
  const [session] = useSession();
  const [isFetching, setIsFetching] = useState(false);

  if (!session || !clearAlert || !createAlertWithMessage)
    return (
      <>
        <Typography variant="h5" align="center">
          You must be logged in to view this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={() => {
            signIn();
          }}
        >
          Login
        </Button>
      </>
    );

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsFetching(true);
    const results = (await bggFetchGamesByQuery(query)) as BGGGameResponse[];
    setQueryResults(results);
    setIsFetching(false);
    clearAlert();
  };

  const handleQueryChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    setQuery(e.target.value);
  };

  const addGame = async (gameToAdd: Game) => {
    try {
      const response = await axios.post("/api/games", gameToAdd);
      createAlertWithMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            type="submit"
            disabled={isFetching}
          >
            {isFetching ? <CircularProgress /> : "Search"}
          </Button>
          <Typography variant="caption">
            Note: This search uses the BoardGameGeek API, which requires a
            separate call to query IDs and a call for each result. Please be
            patient with it, as I find ways to improve this experience.
          </Typography>
        </form>
      </Container>
      <Container>
        <>
          {queryResults &&
            queryResults.map((result) => (
              <Accordion key={result.bggId} square>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${result.bggId}-content`}
                >
                  <Typography>
                    {result.name} ({result.yearPublished})
                  </Typography>
                </AccordionSummary>
                <StyledAccordionDetails>
                  <StyledButton
                    fullWidth
                    size="large"
                    color="secondary"
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
                  </StyledButton>
                  <GameDetails game={result} />
                </StyledAccordionDetails>
              </Accordion>
            ))}
        </>
      </Container>
    </>
  );
};

export default AddGamePage;
