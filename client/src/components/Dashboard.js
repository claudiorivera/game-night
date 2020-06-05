import React from "react";
import {
  Typography,
  Container,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";

const Dashboard = ({ user }) => {
  return user && user.name ? (
    <Container>
      <Typography variant="h5">
        {/* https://stackoverflow.com/questions/12340789/split-first-name-and-last-name-using-javascript */}
        Hello, {user.name.split(" ").slice(0, -1).join(" ")}!
      </Typography>
      <Button fullWidth color="primary" variant="contained">
        Log Out
      </Button>
    </Container>
  ) : (
    <CircularProgress />
  );
};

const mapStateToPropse = (state) => ({ user: state.user });

export default connect(mapStateToPropse)(Dashboard);
