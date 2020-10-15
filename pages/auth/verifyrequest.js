import { Container, Link, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React from "react";

const StyledLink = styled(Link)({
  cursor: "pointer",
});

const AuthVerifyRequestPage = () => {
  return (
    <Container>
      <Typography variant="body1">Check your email.</Typography>
    </Container>
  );
};

export default AuthVerifyRequestPage;
