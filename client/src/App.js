import React from "react";
import "fontsource-roboto";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MainAppBar, AlertDialog, PrivateRoute } from "./components";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { UserProfile } from "./pages/profile";
import { GameList, AddGame } from "./pages/games";
import { EventList } from "./pages/events";
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
          <PrivateRoute exact path="/events">
            <EventList />
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
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
