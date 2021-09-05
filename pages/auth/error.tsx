import { Typography } from "@mui/material";
import { Link } from "components";
import { useRouter } from "next/router";
import React from "react";

const AuthErrorPage = () => {
  const router = useRouter();
  return (
    <>
      <Typography variant="h5">Sorry, something went wrong.</Typography>
      <Link
        href="/auth/login"
        sx={{
          cursor: "pointer",
        }}
      >
        Click here to try again
      </Link>
      .<Typography variant="body1">Error Code: {router.query.error}</Typography>
    </>
  );
};

export default AuthErrorPage;
