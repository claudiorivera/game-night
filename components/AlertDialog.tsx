import { Alert, AlertTitle, Container, Snackbar } from "@mui/material";
import { styled } from "@mui/styles";
import { AlertContext } from "context/Alert";
import { useContext } from "react";

const StyledContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  "& > * + *": {
    marginTop: theme.spacing(2),
  },
}));

export const AlertDialog = () => {
  const { message, clearAlert } = useContext(AlertContext);

  if (!message) return null;

  return (
    <StyledContainer>
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
    </StyledContainer>
  );
};
