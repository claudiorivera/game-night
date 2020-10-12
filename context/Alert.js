import React, { createContext, useReducer } from "react";
import { reducer } from "./AlertReducer";

const initialState = {
  message: null,
};

export const AlertContext = createContext(initialState);

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ALERTS
  const createAlertWithMessage = (message) => {
    dispatch({ type: "CREATE_ALERT_WITH_MESSAGE", message });
  };
  const clearAlert = () => {
    dispatch({ type: "CLEAR_ALERT" });
  };

  AlertContext.displayName = "Alert";

  return (
    <AlertContext.Provider
      value={{
        message: state.message,
        createAlertWithMessage,
        clearAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
