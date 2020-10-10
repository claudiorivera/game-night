import React, { createContext, useReducer, useContext } from "react";
import { reducer } from "./reducer";
import { AppContext } from "../../app/context";
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
      const response = await axios.post("/api/games", {
        ...gameToAdd,
      });
      createAlertWithMessage(response.data.message);
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };
  const getAllGames = async () => {
    try {
      const response = await axios.get("/api/games");
      if (response.data.success) {
        dispatch({
          type: "GET_GAMES_LIST_SUCCESSFUL_WITH_GAMES",
          games,
        });
      } else {
        createAlertWithMessage(response.data.message);
      }
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
