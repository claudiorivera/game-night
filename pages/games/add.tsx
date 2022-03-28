import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { GameDetails } from "components";
import { AlertContext } from "context/Alert";
import { bggFetchGamesByQuery } from "lib/bggFetchGamesByQuery";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useContext, useState } from "react";
import { BGGGameResponse } from "types";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

const AddGamePage = () => {
  const router = useRouter();
  const { clearAlert, createAlertWithMessage } = useContext(AlertContext);
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState<BGGGameResponse[] | null>(
    null
  );
  const [isFetching, setIsFetching] = useState(false);

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsFetching(true);
    const results = (await bggFetchGamesByQuery(query)) as BGGGameResponse[];
    setQueryResults(results);
    setIsFetching(false);
    clearAlert!();
  };

  const handleQueryChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    setQuery(e.target.value);
  };

  const addGame = async (gameToAdd: any) => {
    try {
      await axios.post("/api/games", gameToAdd);
      createAlertWithMessage("Success!");
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
        </form>
      </Container>
      <Container>
        <>
          {queryResults &&
            queryResults.map((result) => {
              if (!result.imageSrc) return null;
              return (
                <Accordion key={result.bggId} square>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${result.bggId}-content`}
                  >
                    <Typography>
                      {result.name} ({result.yearPublished})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      sx={{
                        margin: ".5rem 0",
                      }}
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
                          mechanics: result.mechanics,
                        });
                        router.push("/games");
                      }}
                    >
                      Add This Game
                    </Button>
                    <GameDetails game={result} />
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </>
      </Container>
    </>
  );
};

export default AddGamePage;
