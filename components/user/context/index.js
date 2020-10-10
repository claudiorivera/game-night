import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AppContext } from "../../app/context";
import { reducer } from "./reducer";
const axios = require("axios").default;

const initialState = {
  user: null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { createAlertWithMessage } = useContext(AppContext);

  const registerUser = async (name, email, password) => {
    try {
      const response = await axios.post("/api/user/register", {
        name,
        email: email.toLowerCase(),
        password,
      });
      if (response.data.success) {
        dispatch({
          type: "REGISTER_USER_SUCCESSFUL_WITH_USER",
          user: response.data.user,
        });
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
        dispatch({
          type: "LOGIN_SUCCESSFUL_WITH_USER",
          user: response.data.user,
        });
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
        dispatch({ type: "LOGOUT_SUCCESSFUL" });
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
        dispatch({ type: "DELETE_USER_BY_ID_SUCCESSFUL" });
        createAlertWithMessage(response.data.message);
      } else {
        createAlertWithMessage(response.data.message);
      }
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const authUser = async () => {
    try {
      const response = await axios.get("/api/user/auth");
      if (response.data.success) {
        dispatch({
          type: "AUTH_USER_SUCCESSFUL_WITH_USER",
          user: response.data.user,
        });
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
        dispatch({
          type: "GET_USER_EVENTS_SUCCESSFUL_WITH_EVENTS",
          events: response.data.events,
        });
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
        dispatch({
          type: "GET_USER_EVENTS_HOSTING_SUCCESSFUL_WITH_EVENTS",
          events: response.data.events,
        });
      } else {
        createAlertWithMessage(response.data.message);
      }
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  useEffect(() => {
    authUser();
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
        getUserEvents,
        getUserEventsHosting,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
