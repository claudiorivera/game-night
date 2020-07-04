import React, { createContext, useReducer, useContext } from "react";
import { reducer } from "./reducer";
import { AppContext } from "../../../App/context";
const axios = require("axios").default;

const initialState = {
  events: null,
};

export const EventsContext = createContext(initialState);

export const EventsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { createAlertWithMessage } = useContext(AppContext);

  const deleteEventById = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`);
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };
  const joinEventById = async (id) => {
    try {
      const event = await axios.put(`/api/events/${id}/join`);
      dispatch({
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
      dispatch({
        type: "ADD_EVENT_SUCCESSFUL_WITH_EVENT",
        event,
      });
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };
  const getAllEvents = async () => {
    try {
      const { data: events } = await axios.get("/api/events");
      dispatch({ type: "GET_ALL_EVENTS_SUCCESSFUL_WITH_EVENTS", events });
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  EventsContext.displayName = "Events";

  return (
    <EventsContext.Provider
      value={{
        events: state.events,
        addEvent,
        joinEventById,
        getAllEvents,
        deleteEventById,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
