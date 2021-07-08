import { AlertContext } from "@context/Alert";
import { Container, Snackbar } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useContext } from "react";

const StyledContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  "& > * + *": {
    marginTop: theme.spacing(2),
  },
}));

const AlertDialog = () => {
  const { message, clearAlert } = useContext(AlertContext);
  if (!message) return null;
  return (
    <StyledContainer>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open
        autoHideDuration={3000}
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

export default AlertDialog;
