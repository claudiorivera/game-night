import {
  Alert,
  AlertTitle,
  Container,
  Snackbar,
  useTheme,
} from "@mui/material";
import { AlertContext } from "context/Alert";
import { useContext } from "react";

export const AlertDialog = () => {
  const { message, clearAlert } = useContext(AlertContext);
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open
        autoHideDuration={4000}
        onClose={() => {
          clearAlert();
        }}
      >
        <Alert
          onClose={() => {
            clearAlert();
          }}
          severity="warning"
        >
          <AlertTitle>Alert</AlertTitle>
          {JSON.stringify(message)}
        </Alert>
      </Snackbar>
    </Container>
  );
};
