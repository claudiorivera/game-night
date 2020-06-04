import React, { Fragment } from "react";
import "fontsource-roboto";
import { CssBaseline } from "@material-ui/core";
import { Router } from "@reach/router";
import { Register, Login, Dashboard } from "./components";
import { MainAppBar } from "./components/MainAppBar";

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <MainAppBar />
      <Router>
        <Dashboard path="dashboard" />
        <Login path="login" />
        <Register path="register" />
      </Router>
    </Fragment>
  );
}

export default App;
