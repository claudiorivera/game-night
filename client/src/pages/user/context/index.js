import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";
const axios = require("axios").default;

// initialState
const initialState = {
  user: null,
};

// Create context
export const UserContext = createContext(initialState);

// Global context provider
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // USERS
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

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loginUser,
        logoutUser,
        registerUser,
        deleteUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
