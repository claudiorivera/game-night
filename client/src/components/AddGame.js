import React, { useState, useContext, Fragment } from "react";
import { GlobalContext } from "../context";
import {
  Button,
  TextField,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GameDetails } from "../components";
import bggGameFetchById from "../util/bggGameFetchById";
import bggIdFetchByQuery from "../util/bggIdFetchByQuery";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginBottom: "1vh",
  },
  mb0: {
    marginBottom: "0px",
  },
  listItem: {
    paddingTop: "0px",
    paddingBottom: "0px",
    marginTop: "0px",
    marginBottom: "0px",
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const AddGame = () => {
  const history = useHistory();
  const [gameDetails, setGameDetails] = useState(null);
  const [gameQueryResults, setGameQueryResults] = useState([]);
  const [formBggIdInput, setFormBggIdInput] = useState("");
  const [formBggQueryInput, setFormBggQueryInput] = useState("");
  const { addGame } = useContext(GlobalContext);
  const classes = useStyles();

  const handleAddGame = async () => {
    await addGame({ ...gameDetails });
    history.push("/games");
  };

  const handleSearchById = async (e) => {
    e.preventDefault();
    const fetchedGame = await bggGameFetchById(parseInt(formBggIdInput));
    setGameDetails(fetchedGame);
  };

  const handleSearchByName = async (e) => {
    e.preventDefault();
  };

  const handleQueryInputChange = async (e) => {
    setFormBggQueryInput(e.target.value);
    const results = await bggIdFetchByQuery(formBggQueryInput);
    setGameQueryResults(results);
  };

  return (
    <Container>
      <form onSubmit={handleSearchById}>
        <TextField
          type="number"
          name="bggId"
          id="bggId"
          label="BoardGameGeek ID"
          placeholder="Enter a BoardGameGeek game ID"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={formBggIdInput}
          onChange={(e) => setFormBggIdInput(e.target.value)}
        />
        <Button
          type="submit"
          size="large"
          fullWidth
          color="primary"
          variant="contained"
        >
          Search by BoardGameGeek ID
        </Button>
      </form>
      <form onSubmit={handleSearchByName}>
        <TextField
          className={classes.mb0}
          name="bggQuery"
          id="bggQuery"
          label="Boardgame name"
          placeholder="Enter a boardgame name to search for"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={formBggQueryInput}
          onChange={handleQueryInputChange}
        />
        {/* Start */}
        <div className={classes.root}>
          <List className={classes.listItem}>
            <ListItemLink href="#">
              <ListItemText primary="Result" />
            </ListItemLink>
          </List>
        </div>
        {/* End */}
        <Button
          type="submit"
          size="large"
          fullWidth
          color="primary"
          variant="contained"
        >
          Search by Name
        </Button>
      </form>
      {/* Display game details if we got any */}
      {gameDetails && (
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
