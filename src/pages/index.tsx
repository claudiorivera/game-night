import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";

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
    <div>
      {JSON.stringify({ name, eventsHosting, eventsAttending }, null, 2)}
    </div>
  );
};

export default HomePage;
