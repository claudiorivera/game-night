import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  styled,
  Typography,
} from "@material-ui/core";
import fetcher from "@util/fetcher";
import { signIn, useSession } from "next-auth/client";
import React from "react";
import useSWR from "swr";

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

  const { data: user } = useSWR(`/api/user/${session.user.id}`, fetcher);

  if (!user) return <CircularProgress />;

  return (
    <Container align="center">
      <LargeAvatar alt={user.name} src={user.image} />
      <Typography variant="h5">{user.name}</Typography>
    </Container>
  );
};

export default ProfilePage;
