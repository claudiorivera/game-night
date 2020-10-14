import { CircularProgress, Container, Typography } from "@material-ui/core";
import { useSession } from "next-auth/client";
import React from "react";

const ProfilePage = () => {
  const [session] = useSession();

  if (!session)
    return (
      <Typography align="center" component={"div"}>
        <CircularProgress size={200} thickness={4} />
      </Typography>
    );

  return (
    <Container>
      <Typography variant="h5">Name: {session.user.name}</Typography>
      <Typography variant="h5">Email: {session.user.email}</Typography>
    </Container>
  );
};

export default ProfilePage;
