import { Link, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { useRouter } from "next/router";
import React from "react";

const StyledLink = styled(Link)({
  cursor: "pointer",
});

const AuthErrorPage = () => {
  const router = useRouter();
  return (
    <>
      <Typography variant="h5">Sorry, something went wrong.</Typography>
      <StyledLink href="/auth/login">Click here to try again</StyledLink>.
      <Typography variant="body1">Error Code: {router.query.error}</Typography>
    </>
  );
};

export default AuthErrorPage;
