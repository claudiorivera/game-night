import { Button, Container, styled, Typography } from "@material-ui/core";
import { useSession } from "next-auth/client";
import Link from "next/link";
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
        <Typography variant="h3">
          You must be logged in to access this page.
        </Typography>
        <Link href="/api/auth/signin">
          <Button
            type="submit"
            size="large"
            fullWidth
            color="secondary"
            variant="contained"
          >
            Login/Register
          </Button>
        </Link>
      </Container>
    );

  return (
    <Container>
      <Img src={session.user.image} alt="User's profile picture" />
      <Typography variant="h5">Name: {session.user.name}</Typography>
      <Typography variant="h5">Email: {session.user.email}</Typography>
    </Container>
  );
};

export default ProfilePage;
