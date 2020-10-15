import { Container, Link, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React from "react";
import { useRouter } from "next/router";

const StyledLink = styled(Link)({
  cursor: "pointer",
});

const AuthErrorPage = () => {
  const router = useRouter();
  return (
    <Container>
      <Typography variant="body1">{router.query.error}</Typography>
      <StyledLink href="/auth/login">Try again</StyledLink>.
    </Container>
  );
};

export default AuthErrorPage;
