import axios from "axios";
import React, { createContext, useContext } from "react";
import { AlertContext } from "../context/Alert";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
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
