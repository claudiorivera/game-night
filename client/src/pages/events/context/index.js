import React, { createContext, useReducer, useContext } from "react";
import { reducer } from "./reducer";
import { AppContext } from "../../../App/context";
const axios = require("axios").default;

// initialState
const initialState = {
  events: null,
};

// Create context
export const EventsContext = createContext(initialState);

// Global context provider
export const EventsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { createAlertWithMessage } = useContext(AppContext);

  const joinEventById = async (id) => {
    try {
      const event = await axios.put(`/api/events/${id}/join`);
      await dispatch({
        type: "JOIN_EVENT_SUCCESSFUL_WITH_EVENT",
        event,
      });
    } catch (error) {
      createAlertWithMessage(error.response.data);
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
      createAlertWithMessage(error.response.data);
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events: state.events,
        addEvent,
        joinEventById,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
