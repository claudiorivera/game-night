import React, { useContext } from "react";
import { Typography, Container } from "@material-ui/core";
import { GlobalContext } from "../context";

const Home = () => {
  const { user } = useContext(GlobalContext);
  return (
    <Container>
      <Typography variant="h5">Hello, {user.name}!</Typography>
    </Container>
  );
};

export default Home;
