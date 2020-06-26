import "fontsource-roboto";
import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AlertDialog from "./components/AlertDialog";
import MainAppBar from "./components/MainAppBar";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "../pages/user/LoginPage";
import ProfilePage from "../pages/user/ProfilePage";
import HomePage from "../pages/home/HomePage";
import GamesListPage from "../pages/games/GamesListPage";
import AddGamePage from "../pages/games/AddGamePage";
import { EventList, AddEvent } from "../pages/events";
import { AppProvider } from "./context";
import { UserProvider } from "../pages/user/context";
import { GamesProvider } from "../pages/games/context";
import { EventsProvider } from "../pages/events/context";
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
    <AppProvider>
      <UserProvider>
        <GamesProvider>
          <EventsProvider>
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
                      <GamesListPage />
                    </PrivateRoute>
                    <PrivateRoute exact path="/events">
                      <EventList />
                    </PrivateRoute>
                    <PrivateRoute path="/games/add">
                      <AddGamePage />
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
          </EventsProvider>
        </GamesProvider>
      </UserProvider>
    </AppProvider>
  );
}

export default App;
