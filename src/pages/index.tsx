import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";

import { EventsListContainer } from "~/components";
import { api } from "~/lib/api";
import { authOptions } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const HomePage = () => {
  const { data: user } = api.user.getCurrentUser.useQuery();

  if (!user) return null;

  const { name, eventsHosting, eventsAttending } = user;

  return (
    <>
      <Typography variant="body1" gutterBottom>
        Hello, {name}.
      </Typography>
      {!!eventsHosting.length && (
        <>
          <Typography variant="h4" gutterBottom>
            Events You Are Hosting:
          </Typography>
          <EventsListContainer
            events={eventsHosting}
            isHosting
            sx={{ mb: 2 }}
          />
        </>
      )}
      {!!eventsAttending.length && (
        <>
          <Typography variant="h4" gutterBottom>
            Events You Are Attending:
          </Typography>
          <EventsListContainer events={eventsAttending} sx={{ mb: 2 }} />
        </>
      )}
    </>
  );
};

export default HomePage;
