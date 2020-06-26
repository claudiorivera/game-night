import React from "react";
import "fontsource-roboto";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AlertDialog from "./components/AlertDialog";
import MainAppBar from "./components/MainAppBar";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "../pages/user/LoginPage";
import ProfilePage from "../pages/user/ProfilePage";
import HomePage from "../pages/home/HomePage";
import { GameList, AddGame } from "../pages/games";
import { EventList, AddEvent } from "../pages/events";
import { GlobalProvider } from "../context";
import { UserProvider } from "../pages/user/context";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#b71c1c",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <GlobalProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router>
              <CssBaseline />
              <MainAppBar />
              <AlertDialog />
              <Switch>
                <Route exact path="/">
                  <HomePage />
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
                <PrivateRoute path="/events/add">
                  <AddEvent />
                </PrivateRoute>
                <PrivateRoute path="/profile">
                  <ProfilePage />
                </PrivateRoute>
                <Route path="/login">
                  <LoginPage />
                </Route>
              </Switch>
            </Router>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </UserProvider>
    </GlobalProvider>
  );
}

export default App;
