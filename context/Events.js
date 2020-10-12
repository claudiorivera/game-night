import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { AlertContext } from "../context/Alert";
import { reducer } from "./EventsReducer";

const initialState = {
  events: null,
};

export const EventsContext = createContext(initialState);

export const EventsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { createAlertWithMessage } = useContext(AlertContext);

  const leaveEventById = async (id) => {
    try {
      const response = await axios.put(`/api/events/${id}?action=leave`);
      createAlertWithMessage(response.data.message);
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const deleteEventById = async (id) => {
    try {
      const response = await axios.delete(`/api/events/${id}`);
      createAlertWithMessage(response.data.message);
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const joinEventById = async (id) => {
    try {
      const response = await axios.put(`/api/events/${id}?action=join`);
      createAlertWithMessage(response.data.message);
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const addEvent = async (gameId, eventDateTime) => {
    try {
      const response = await axios.post("/api/events", {
        gameId,
        eventDateTime,
      });
      createAlertWithMessage(response.data.message);
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const getAllEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      if (response.data.success) {
        dispatch({
          type: "GET_ALL_EVENTS_SUCCESSFUL_WITH_EVENTS",
          events: response.data.events,
        });
      } else {
        createAlertWithMessage(response.data.message);
      }
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const getEventById = async (id) => {
    try {
      const response = await axios.get(`/api/events/${id}`);
      if (response.data.success) {
        return response.data.event;
      } else {
        createAlertWithMessage(response.data.message);
      }
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const updateEvent = async (eventId, gameId, eventDateTime) => {
    try {
      const response = await axios.put(`/api/events/${eventId}?action=edit`, {
        gameId,
        eventDateTime,
      });
      createAlertWithMessage(response.data.message);
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
