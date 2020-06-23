import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { Container } from "@material-ui/core";

const AddEvent = () => {
  const { games, getGamesList, addEvent } = useContext(GlobalContext);

  useEffect(() => {
    const fetchGames = async () => {
      await getGamesList();
    };
    fetchGames();
    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      Add Event
      {games && JSON.stringify(games)}
    </Container>
  );
};

export default AddEvent;
