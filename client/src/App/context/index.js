import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";

const initialState = {
  message: null,
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ALERTS
  const createAlertWithMessage = (message) => {
    dispatch({ type: "CREATE_ALERT_WITH_MESSAGE", message });
  };
  const clearAlert = () => {
    dispatch({ type: "CLEAR_ALERT" });
  };

  return (
    <AppContext.Provider
      value={{
        message: state.message,
        createAlertWithMessage,
        clearAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
