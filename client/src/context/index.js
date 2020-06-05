import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
const axios = require("axios").default;

// initialState
const initialState = {
  user: null,
  error: null,
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

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR_MESSAGE" });
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
      dispatch({ type: "REGISTER_USER_FAILED", payload: error.response.data });
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
      dispatch({ type: "USER_LOGIN_FAILED", payload: error.response.data });
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
      dispatch({
        type: "CHECK_IS_AUTHENTICATED_FAILED",
        payload: error.response.data,
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
        clearError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
