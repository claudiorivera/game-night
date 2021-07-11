import EventsListContainer from "@components/EventsListContainer";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import middleware from "@middleware";
import Event, { Event as IEvent } from "@models/Event";
import fetcher from "@util/fetcher";
import { GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/client";
import useSWR from "swr";

interface HomePageProps {
  eventsHosting: IEvent[];
  eventsAttending: IEvent[];
}

const HomePage = ({ eventsHosting, eventsAttending }: HomePageProps) => {
  const [session] = useSession();
  const { data: user } = useSWR(
    session ? `/api/user/${session.user.id}` : null,
    fetcher
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

  if (!user) return <CircularProgress />;

  return (
    <>
      <Typography variant="body1" gutterBottom>
        Hello, {user.name}.
      </Typography>
      {!!eventsHosting.length && (
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
      {!!eventsAttending.length && (
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await middleware.run(req, res);
  const session = await getSession({ req });

  if (!session) return { props: { eventsHosting: [], eventsAttending: [] } };

  const allEvents = (await Event.find().populate(
    "eventGame",
    "name imageSrc"
  )) as IEvent[];
  const eventsHosting = allEvents.filter(
    (event) => event.eventHost._id.toString() === session.user.id
  );
  const eventsAttending = allEvents.filter(
    (event) =>
      !!event.eventGuests.filter(
        (guest) => guest._id.toString() === session.user.id
      ).length
  );

  return {
    // https://github.com/vercel/next.js/discussions/11209#discussioncomment-35915
    props: JSON.parse(JSON.stringify({ eventsHosting, eventsAttending })),
  };
};
