import React from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Link to="/games">Go To Games List</Link>
    </Container>
  );
};

export default Home;
