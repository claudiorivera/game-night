import { CircularProgress, Container, Typography } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import useSWR from "swr";
import EventsListContainer from "../components/EventsListContainer";
import fetcher from "../util/fetcher";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const { data } = useSWR("/api/user/auth", fetcher);

  useEffect(() => {
    if (!data) router.push("/login");
  }, []);

  return (
    <Container>
      {!data && (
        <Typography align="center" component={"div"}>
          <CircularProgress size={300} thickness={5} />
        </Typography>
      )}
      {data?.user?._id && `Hello, ${data.user.name}.`}
      {data?.user?.eventsHosting && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Hosting:
          </Typography>
          <EventsListContainer events={data.user.eventsHosting} isHosting />
        </Fragment>
      )}
      {data?.user?.events && (
        <Fragment>
          <Typography variant="body1" style={{ marginTop: "1.5rem" }}>
            Events You Are Attending:
          </Typography>
          <EventsListContainer events={data.user.events} />
        </Fragment>
      )}
    </Container>
  );
};

export default HomePage;
