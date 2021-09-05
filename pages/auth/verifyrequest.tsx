import { Typography } from "@mui/material";
import React from "react";

const AuthVerifyRequestPage = () => (
  <Typography variant="body1" align="center">
    {`Check your email for a login link from ${process.env.NEXT_PUBLIC_EMAIL_FROM}. Be
    sure to check your spam folder.`}
  </Typography>
);

export default AuthVerifyRequestPage;
