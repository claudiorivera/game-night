import { Button, Container, styled, Typography } from "@material-ui/core";
import { signIn, useSession } from "next-auth/client";
import React from "react";

const Img = styled("img")({
  borderRadius: "50%",
  maxWidth: "5rem",
  margin: "2rem auto",
  display: "block",
});

const ProfilePage = () => {
  const [session] = useSession();

  if (!session)
    return (
      <Container>
        <Typography variant="h5" align="center">
          You must be logged in to access this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={signIn}
        >
          Login/Register
        </Button>
      </Container>
    );

  return (
    <Container>
      <Img src={session.user.image} alt="User's profile picture" />
      <Typography variant="h5">Name: {session.user.name}</Typography>
    </Container>
  );
};

export default ProfilePage;
