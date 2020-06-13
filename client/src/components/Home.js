import React, { useContext } from "react";
import { Container, Typography } from "@material-ui/core";
import { GlobalContext } from "../context";
const Home = () => {
  const { user } = useContext(GlobalContext);

  return (
    <Container>
      <Typography variant="h3">
        Hello, {user ? user.name : "there. Please log in or register"}.
      </Typography>
      {user && (
        <Typography variant="body1">
          If you're logged in, you can read this.
        </Typography>
      )}
    </Container>
  );
};

export default Home;
