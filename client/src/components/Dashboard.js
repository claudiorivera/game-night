import React from "react";
import { Typography, Container, Button } from "@material-ui/core";

export const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h5">Hello, user.</Typography>
      <Button fullWidth color="primary" variant="contained">
        Log Out
      </Button>
    </Container>
  );
};
