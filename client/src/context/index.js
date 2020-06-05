import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
const axios = require("axios").default;

// initialState
const initialState = {
  user: {},
  error: {},
  isAuthenticated: false,
};

// Create context
export const GlobalContext = createContext(initialState);

// Global context provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Action creators here
  const createError = (errorMessage) => {
    dispatch({ type: "CREATE_ERROR_MESSAGE", payload: errorMessage });
  };

  const registerUser = async (name, email, password) => {
    try {
      const {
        data: { user },
      } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: "REGISTER_USER_SUCCESSFUL", payload: user });
    } catch (error) {
      const { statusText: errorMessage } = error.response;
      dispatch({ type: "REGISTER_USER_FAILED", payload: errorMessage });
    }
  };

  const logInUser = async (email, password) => {
    try {
      const {
        data: { user },
      } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN_SUCCESSFUL", payload: user });
    } catch (error) {
      const { statusText: errorMessage } = error.response;
      dispatch({ type: "USER_LOGIN_FAILED", payload: errorMessage });
    }
  };

  const checkIsAuthenticated = async () => {
    try {
      const { isAuthenticated } = await axios.get("/api/users/auth");
      dispatch({
        type: "CHECK_IS_AUTHENTICATED_SUCCESSFUL",
        payload: isAuthenticated,
      });
    } catch (error) {
      const { statusText: errorMessage } = error.response;
      dispatch({
        type: "CHECK_IS_AUTHENTICATED_FAILED",
        payload: errorMessage,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        logInUser,
        checkIsAuthenticated,
        registerUser,
        createError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
