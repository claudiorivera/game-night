import React, { useContext, Fragment } from "react";
import { Container, Typography } from "@material-ui/core";
import { GlobalContext } from "../context";
const Home = () => {
  const { user } = useContext(GlobalContext);

  return (
    <Container>
      <Typography variant="h3">Hello, {user ? user.name : "there"}.</Typography>
    </Container>
  );
};

export default Home;
