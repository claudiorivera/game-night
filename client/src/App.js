import React from "react";
import { CssBaseline } from "@material-ui/core";
import { Router } from "@reach/router";
import {
  Register,
  Login,
  UserProfile,
  Home,
  MainAppBar,
  AlertDialog,
  PrivateRoute,
} from "./components";
import "fontsource-roboto";
import { GlobalProvider } from "./context";

function App() {
  return (
    <GlobalProvider>
      <CssBaseline />
      <MainAppBar />
      <AlertDialog />
      <Router>
        <PrivateRoute as={Home} path="home" />
        <PrivateRoute as={UserProfile} path="profile" />
        <Login path="login" />
        <Register path="register" />
      </Router>
    </GlobalProvider>
  );
}

export default App;
