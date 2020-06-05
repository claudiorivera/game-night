import React, { Fragment } from "react";
import { CssBaseline } from "@material-ui/core";
import { Router } from "@reach/router";
import { Register, Login, Dashboard, MainAppBar } from "./components";
import "fontsource-roboto";

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <MainAppBar />
      <Router>
        <Dashboard path="/dashboard" />
        <Login path="/login" />
        <Register path="/register" />
      </Router>
    </Fragment>
  );
}

export default App;
