import axios from "axios";
import React, { createContext, useContext } from "react";
import { AlertContext } from "./Alert";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { createAlertWithMessage } = useContext(AlertContext);

  const registerUser = async (name, email, password) => {
    try {
      await axios.post("/api/user/register", {
        name,
        email: email.toLowerCase(),
        password,
      });
    } catch (error) {
      createAlertWithMessage(error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      await axios.post("/api/user/login", {
        email: email.toLowerCase(),
        password,
      });
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post("/api/user/auth");
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
