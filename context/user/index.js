import React, { createContext, useContext } from "react";
import { AppContext } from "../app";
const axios = require("axios").default;

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { createAlertWithMessage } = useContext(AppContext);

  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post("/api/user/register", {
        name,
        email: email.toLowerCase(),
        password,
      });
      if (response.data.success) {
        // TODO
      } else {
        createAlertWithMessage(response.data.message);
      }
    } catch (error) {
      createAlertWithMessage(error.response?.data);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post("/api/user/login", {
        email: email.toLowerCase(),
        password,
      });
      if (response.data.success) {
        // TODO
      } else {
        createAlertWithMessage(response.data.message);
      }
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.get("/api/user/logout");
      if (response.data.success) {
        // TODO
      } else {
        createAlertWithMessage(response.data.message);
      }
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const deleteUserById = async (id) => {
    try {
      const response = await axios.delete(`/api/user/${id}`);
      if (response.data.success) {
        // TODO
      } else {
        createAlertWithMessage(response.data.message);
      }
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const getUserEvents = async (id) => {
    try {
      const response = await axios.get(`/api/user/${id}?events`);
      if (response.data.success) {
        // TODO
      } else {
        createAlertWithMessage(response.data.message);
      }
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const getUserEventsHosting = async (id) => {
    try {
      const response = await axios.get(`/api/user/${id}?events=hosting`);
      if (response.data.success) {
        // TODO
      } else {
        createAlertWithMessage(response.data.message);
      }
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  UserContext.displayName = "User";

  return (
    <UserContext.Provider
      value={{
        loginUser,
        logoutUser,
        registerUser,
        deleteUserById,
        getUserEvents,
        getUserEventsHosting,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
