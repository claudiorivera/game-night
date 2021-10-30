import { Button, CircularProgress, Typography } from "@mui/material";
import { EventsListContainer } from "components";
import useUser from "hooks/useUser";
import { signIn, useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();
  const { user, isLoading, eventsAttending, eventsHosting } = useUser(
    session ? session.user.id : undefined
  );

  if (!session)
    return (
      <>
        <Typography variant="h5" align="center" gutterBottom>
          Welcome. Please login.
        </Typography>
        <Button
          type="submit"
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={() => {
            signIn();
          }}
        >
          Login
        </Button>
      </>
    );

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Typography variant="body1" gutterBottom>
        Hello, {user.name}.
      </Typography>
      {!!eventsHosting?.length && (
        <>
          <Typography variant="h4" gutterBottom>
            Events You Are Hosting:
          </Typography>
          <EventsListContainer
            events={eventsHosting}
            isHosting
            style={{ marginBottom: "1rem" }}
          />
        </>
      )}
      {!!eventsAttending?.length && (
        <>
          <Typography variant="h4" gutterBottom>
            Events You Are Attending:
          </Typography>
          <EventsListContainer
            events={eventsAttending}
            style={{ marginBottom: "1rem" }}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
