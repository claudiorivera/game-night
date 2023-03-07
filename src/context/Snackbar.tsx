import { createContext, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

interface SnackbarContext {
  message: string | null;
  createErrorMessage: (message: string) => void;
  createSuccessMessage: (message: string) => void;
  clearSnackbar: () => void;
  severity: "error" | "success";
}

export const SnackbarContext = createContext({} as SnackbarContext);

export const SnackbarProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"error" | "success">("success");

  const createErrorMessage = (message: string) => {
    setSeverity("error");
    setMessage(message);
  };

  const createSuccessMessage = (message: string) => {
    setSeverity("success");
    setMessage(message);
  };

  const clearSnackbar = () => {
    setMessage(null);
  };

  SnackbarContext.displayName = "Snackbar";

  return (
    <SnackbarContext.Provider
      value={{
        message,
        createErrorMessage,
        createSuccessMessage,
        clearSnackbar,
        severity,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
