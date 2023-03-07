import {
  Alert,
  Container,
  Snackbar as _Snackbar,
  useTheme,
} from "@mui/material";
import { useContext } from "react";

import { SnackbarContext } from "~/context/Snackbar";

export const Snackbar = () => {
  const { message, clearSnackbar, severity } = useContext(SnackbarContext);
  const theme = useTheme();

  if (!message) return null;

  return (
    <Container
      sx={{
        width: "100%",
        "& > * + *": {
          marginTop: theme.spacing(2),
        },
      }}
    >
      <_Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open
        autoHideDuration={4000}
        onClose={() => {
          clearSnackbar();
        }}
      >
        <Alert
          onClose={() => {
            clearSnackbar();
          }}
          severity={severity}
        >
          {JSON.stringify(message)}
        </Alert>
      </_Snackbar>
    </Container>
  );
};
