import { Button, Container, Typography } from "@material-ui/core";
import { useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";

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
      <Typography variant="h5">Name: {session.user.name}</Typography>
      <Typography variant="h5">Email: {session.user.email}</Typography>
    </Container>
  );
};

export default ProfilePage;
