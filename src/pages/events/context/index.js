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

  const leaveEventById = async (id) => {
    try {
      await axios.put(`/api/events/${id}/leave`);
      createAlertWithMessage("Leave event successful!");
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const deleteEventById = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`);
      createAlertWithMessage("Delete event successful!");
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const joinEventById = async (id) => {
    try {
      await axios.put(`/api/events/${id}/join`);
      createAlertWithMessage("Join event successful!");
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const addEvent = async (gameId, eventDateTime) => {
    try {
      await axios.post(`/api/events/add`, {
        gameId,
        eventDateTime,
      });
      createAlertWithMessage("Add event successful!");
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

  const getEventById = async (id) => {
    try {
      const { data: event } = await axios.get(`/api/events/${id}`);
      return event;
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const updateEvent = async (id, gameId, eventDateTime) => {
    try {
      await axios.put(`/api/events/${id}/edit`, {
        gameId,
        eventDateTime,
      });
      createAlertWithMessage("Update event successful!");
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
        leaveEventById,
        getEventById,
        updateEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
