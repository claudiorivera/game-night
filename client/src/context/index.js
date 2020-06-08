import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
const axios = require("axios").default;

// initialState
const initialState = {
  user: null,
  alert: null,
};

// Create context
export const GlobalContext = createContext(initialState);

// Global context provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Action creators
  const createAlertWithMessage = (message) => {
    dispatch({ type: "CREATE_ALERT_WITH_MESSAGE", message });
  };

  const clearAlert = () => {
    dispatch({ type: "CLEAR_ALERT" });
  };

  const registerUser = async (name, email, password) => {
    try {
      const { data: user } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: "REGISTER_USER_SUCCESSFUL_WITH_USER", user });
    } catch (error) {
      const message = error.response.data;
      dispatch({ type: "REGISTER_USER_FAILED_WITH_MESSAGE", message });
    }
  };

  const loginUser = async (email, password) => {
    try {
      const { data: user } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESSFUL_WITH_USER", user });
    } catch (error) {
      const message = error.response.data;
      dispatch({ type: "LOGIN_FAILED_WITH_MESSAGE", message });
    }
  };

  const logoutUser = async () => {
    try {
      const { data: user } = await axios.get("/api/users/logout");
      dispatch({ type: "LOGOUT_SUCCESSFUL_WITH_USER", user });
    } catch (error) {
      const message = error.response.data;
      dispatch({ type: "LOGOUT_FAILED_WITH_MESSAGE", message });
    }
  };

  const deleteUserById = async (_id) => {
    try {
      const { data: user } = await axios.delete(`/api/users/${_id}`);
      dispatch({ type: "DELETE_USER_BY_ID_SUCCESSFUL_WITH_USER", user });
      dispatch({
        type: "CREATE_ALERT_WITH_MESSAGE",
        message: "User successfully deleted",
      });
    } catch (error) {
      const message = error.response.data;
      dispatch({ type: "DELETE_USER_BY_ID_FAILED_WITH_MESSAGE", message });
    }
  };

  const addGame = async (gameToAdd) => {
    try {
      await axios.post("/api/games/add", {
        ...gameToAdd,
      });
      await dispatch({
        type: "ADD_GAME_SUCCESSFUL_WITH_MESSAGE",
        message: "Game successfully added",
      });
    } catch (error) {
      const message = error.response.data;
      dispatch({ type: "ADD_GAME_FAILED_WITH_MESSAGE", message });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        alert: state.alert,
        loginUser,
        logoutUser,
        registerUser,
        deleteUserById,
        createAlertWithMessage,
        clearAlert,
        addGame,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
