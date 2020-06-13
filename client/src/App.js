import React from "react";
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
import "fontsource-roboto";
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
          <PrivateRoute path="/profile">
            <UserProfile />
          </PrivateRoute>
          <PrivateRoute exact path="/games">
            <GameList />
          </PrivateRoute>
          <PrivateRoute path="/games/add">
            <AddGame />
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
