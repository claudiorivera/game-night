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
      <Typography variant="h5">Sorry, something went wrong.</Typography>
      <StyledLink href="/auth/login">Click here to try again</StyledLink>.
      <Typography variant="body1">Error Code: {router.query.error}</Typography>
    </Container>
  );
};

export default AuthErrorPage;
