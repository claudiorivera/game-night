import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface AlertContext {
  message: string | null;
  createAlertWithMessage: (message: string) => void;
  clearAlert: () => void;
}

export const AlertContext = createContext<Partial<AlertContext>>({});

export const AlertProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string | null>(null);

  const createAlertWithMessage = (message: string) => {
    setMessage(message);
  };
  const clearAlert = () => {
    setMessage(null);
  };

  AlertContext.displayName = "Alert";

  return (
    <AlertContext.Provider
      value={{
        message,
        createAlertWithMessage,
        clearAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
