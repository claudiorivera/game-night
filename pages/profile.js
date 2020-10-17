import { Container, styled, Typography } from "@material-ui/core";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AlertContext } from "../context/Alert";

const Img = styled("img")({
  borderRadius: "50%",
  maxWidth: "5rem",
  margin: "2rem auto",
  display: "block",
});

const ProfilePage = () => {
  const router = useRouter();
  const { createAlertWithMessage } = useContext(AlertContext);
  const [session] = useSession();

  if (!session) {
    createAlertWithMessage("You must be signed in to access this page");
    router.push("/auth/login");
  }

  return (
    <Container>
      <Img src={session.user.image} alt="User's profile picture" />
      <Typography variant="h5">Name: {session.user.name}</Typography>
      <Typography variant="h5">
        Email Verified? {session.user.emailVerified ? "Yes" : "No"}
      </Typography>
    </Container>
  );
};

export default ProfilePage;
