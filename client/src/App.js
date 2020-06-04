import React, { Fragment } from "react";
import "fontsource-roboto";
import { CssBaseline } from "@material-ui/core";
import { Router } from "@reach/router";
import { Register, Login, Dashboard, Welcome } from "./components";
import { MainAppBar } from "./components/MainAppBar";

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <MainAppBar />
      <Router>
        <Welcome path="/" />
        <Dashboard path="dashboard" />
        <Login path="login" />
        <Register path="register" />
      </Router>
    </Fragment>
  );
}

export default App;
