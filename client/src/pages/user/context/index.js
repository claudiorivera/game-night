import React, { createContext, useReducer, useContext, useEffect } from "react";
import { reducer } from "./reducer";
import { AppContext } from "../../../App/context";
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
  const { createAlertWithMessage } = useContext(AppContext);

  // USERS
  const registerUser = async (name, email, password) => {
    try {
      const { data: user } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });
      dispatch({ type: "REGISTER_USER_SUCCESSFUL_WITH_USER", user });
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };
  const loginUser = async (email, password) => {
    try {
      const { data: user } = await axios.post("/api/user/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESSFUL_WITH_USER", user });
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };
  const logoutUser = async () => {
    try {
      const { data: user } = await axios.get("/api/user/logout");
      dispatch({ type: "LOGOUT_SUCCESSFUL_WITH_USER", user });
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };
  const deleteUserById = async (_id) => {
    try {
      const { data: user } = await axios.delete(`/api/user/${_id}`);
      dispatch({ type: "DELETE_USER_BY_ID_SUCCESSFUL_WITH_USER", user });
      createAlertWithMessage("User successfully deleted");
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const authUser = async () => {
    try {
      const { data: user } = await axios.get("/api/user/auth");
      dispatch({ type: "AUTH_USER_SUCCESSFUL_WITH_USER", user });
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  useEffect(() => {
    authUser();
    //eslint-disable-next-line
  }, []);

  UserContext.displayName = "User";

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loginUser,
        logoutUser,
        registerUser,
        deleteUserById,
        authUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
