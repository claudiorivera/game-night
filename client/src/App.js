import React from "react";
import { CssBaseline } from "@material-ui/core";
import { Router } from "@reach/router";
import {
  Register,
  Login,
  Dashboard,
  MainAppBar,
  ErrorAlert,
} from "./components";
import "fontsource-roboto";
import { GlobalProvider } from "./context";

function App() {
  return (
    <GlobalProvider>
      <CssBaseline />
      <MainAppBar />
      <ErrorAlert />
      <Router>
        <Dashboard path="/dashboard" />
        <Login path="/login" />
        <Register path="/register" />
      </Router>
    </GlobalProvider>
  );
}

export default App;
