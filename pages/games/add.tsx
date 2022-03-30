import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { GameDetails } from "components";
import { bggFetchGamesByQuery } from "lib/bggFetchGamesByQuery";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useState } from "react";
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
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState<BGGGameResponse[] | null>(
    null
  );
  const [isFetching, setIsFetching] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsFetching(true);
    const results = (await bggFetchGamesByQuery(query)) as BGGGameResponse[];
    setQueryResults(results);
    setIsFetching(false);
  };

  const handleQueryChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    setQuery(e.target.value);
  };

  const addGame = async (gameToAdd: Prisma.GameCreateInput) => {
    try {
      await axios.post("/api/games", gameToAdd);
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
          <LoadingButton
            variant="contained"
            color="secondary"
            fullWidth
            type="submit"
            disabled={isFetching}
            loading={isFetching}
          >
            Search
          </LoadingButton>
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
                    <LoadingButton
                      sx={{
                        margin: ".5rem 0",
                      }}
                      fullWidth
                      size="large"
                      color="secondary"
                      variant="contained"
                      disabled={disabled}
                      loading={disabled}
                      onClick={async () => {
                        setDisabled(true);
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
                    </LoadingButton>
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
