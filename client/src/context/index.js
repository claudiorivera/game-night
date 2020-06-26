import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
const axios = require("axios").default;

// initialState
const initialState = {
  alert: null,
  games: null,
};

// Create context
export const GlobalContext = createContext(initialState);

// Global context provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // ALERTS
  const createAlertWithMessage = (message) => {
    dispatch({ type: "CREATE_ALERT_WITH_MESSAGE", message });
  };
  const clearAlert = () => {
    dispatch({ type: "CLEAR_ALERT" });
  };

  // GAMES
  const addGame = async (gameToAdd) => {
    try {
      const addedGame = await axios.post("/api/games/add", {
        ...gameToAdd,
      });
      await dispatch({
        type: "ADD_GAME_SUCCESSFUL_WITH_GAME",
        addedGame,
      });
    } catch (error) {
      const message = error.response.data;
      dispatch({ type: "ADD_GAME_FAILED_WITH_MESSAGE", message });
    }
  };
  const getGamesList = async () => {
    try {
      const { data: games } = await axios.get("/api/games");
      dispatch({
        type: "GET_GAMES_LIST_SUCCESSFUL_WITH_GAMES",
        games,
      });
    } catch (error) {
      const message = error.response.data;
      dispatch({ type: "GET_GAMES_LIST_FAILED_WITH_MESSAGE", message });
    }
  };

  // EVENTS
  const joinEventById = async (id) => {
    try {
      const event = await axios.put(`/api/events/${id}/join`);
      await dispatch({
        type: "JOIN_EVENT_SUCCESSFUL_WITH_EVENT",
        event,
      });
    } catch (error) {
      const message = error.response.data;
      dispatch({ type: "JOIN_EVENT_FAILED_WITH_MESSAGE", message });
    }
  };
  const addEvent = async (gameId, eventDateTime) => {
    try {
      const event = await axios.post(`/api/events/add`, {
        gameId,
        eventDateTime,
      });
      await dispatch({
        type: "ADD_EVENT_SUCCESSFUL_WITH_EVENT",
        event,
      });
    } catch (error) {
      const message = error.response.data;
      dispatch({ type: "ADD_EVENT_FAILED_WITH_MESSAGE", message });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        alert: state.alert,
        games: state.games,
        createAlertWithMessage,
        clearAlert,
        addGame,
        joinEventById,
        getGamesList,
        addEvent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
