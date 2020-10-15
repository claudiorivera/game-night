import { Container, Link, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React from "react";

const StyledLink = styled(Link)({
  cursor: "pointer",
});

const AuthErrorPage = () => {
  return (
    <Container>
      <Typography variant="body1">
        Oops. <StyledLink href="/auth/login">Try again</StyledLink>.
      </Typography>
    </Container>
  );
};

export default AuthErrorPage;
