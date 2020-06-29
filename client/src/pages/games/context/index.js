import React, { createContext, useReducer, useContext } from "react";
import { reducer } from "./reducer";
import { AppContext } from "../../../App/context";
const axios = require("axios").default;

const initialState = {
  games: null,
};

export const GamesContext = createContext(initialState);

export const GamesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { createAlertWithMessage } = useContext(AppContext);

  const addGame = async (gameToAdd) => {
    try {
      const addedGame = await axios.post("/api/games/add", {
        ...gameToAdd,
      });
      dispatch({
        type: "ADD_GAME_SUCCESSFUL_WITH_GAME",
        addedGame,
      });
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };
  const getAllGames = async () => {
    try {
      const { data: games } = await axios.get("/api/games");
      dispatch({
        type: "GET_GAMES_LIST_SUCCESSFUL_WITH_GAMES",
        games,
      });
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  GamesContext.displayName = "Games";

  return (
    <GamesContext.Provider
      value={{
        games: state.games,
        addGame,
        getAllGames,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
