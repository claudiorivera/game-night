import React from "react";
import { CssBaseline } from "@material-ui/core";
import { Router } from "@reach/router";
import { BrowserRouter } from "react-router-dom";
import {
  Register,
  Login,
  UserProfile,
  Home,
  MainAppBar,
  AlertDialog,
  PrivateRoute,
  AddGame,
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
        <PrivateRoute as={AddGame} path="addgame" />
        <Login path="login" />
        <Register path="register" />
      </Router>
    </GlobalProvider>
  );
}

export default App;
