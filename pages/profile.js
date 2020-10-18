import {
  Avatar,
  Button,
  Container,
  styled,
  Typography,
} from "@material-ui/core";
import { signIn, useSession } from "next-auth/client";
import React from "react";

const LargeAvatar = styled(Avatar)({
  width: "5rem",
  height: "5rem",
});

const ProfilePage = () => {
  const [session] = useSession();

  if (!session)
    return (
      <Container>
        <Typography variant="h5" align="center">
          You must be logged in to view this page.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={signIn}
        >
          Login
        </Button>
      </Container>
    );

  return (
    <Container align="center">
      <LargeAvatar alt={session.user.name} src={session.user.image} />
      <Typography variant="h5">{session.user.name}</Typography>
    </Container>
  );
};

export default ProfilePage;
