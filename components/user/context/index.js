import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AppContext } from "../../app/context";
import { reducer } from "./reducer";
const axios = require("axios").default;

// TODO: Use localStorage client side? Or handle that server-side?
// https://medium.com/@akrush95/global-cached-state-in-react-using-hooks-context-and-local-storage-166eacf8ab46

const initialState = {
  user: null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { createAlertWithMessage } = useContext(AppContext);

  const registerUser = async (name, email, password) => {
    try {
      const { data: user } = await axios.post("/api/user/register", {
        name,
        email: email.toLowerCase(),
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
        email: email.toLowerCase(),
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

  const getUserEvents = async (userId) => {
    try {
      const { data: events } = await axios.get(`/api/user/${userId}?events`);
      dispatch({ type: "GET_USER_EVENTS_SUCCESSFUL_WITH_EVENTS", events });
    } catch (error) {
      createAlertWithMessage(error.response.data);
    }
  };

  const getUserEventsHosting = async (userId) => {
    try {
      const { data: events } = await axios.get(
        `/api/user/${userId}?events=hosting`
      );
      dispatch({
        type: "GET_USER_EVENTS_HOSTING_SUCCESSFUL_WITH_EVENTS",
        events,
      });
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
