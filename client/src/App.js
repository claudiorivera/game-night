import React from "react";
import "fontsource-roboto";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Register,
  Login,
  UserProfile,
  Home,
  MainAppBar,
  AlertDialog,
  PrivateRoute,
  GameList,
  AddGame,
} from "./components";
import { GlobalProvider } from "./context";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <CssBaseline />
        <MainAppBar />
        <AlertDialog />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute exact path="/games">
            <GameList />
          </PrivateRoute>
          <PrivateRoute path="/games/add">
            <AddGame />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <UserProfile />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
