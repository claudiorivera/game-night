import React from "react";
// Styling
import "fontsource-roboto";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// App components
import AlertDialog from "./components/AlertDialog";
import MainAppBar from "./components/MainAppBar";
import PrivateRoute from "./components/PrivateRoute";
// Pages
import LoginPage from "../pages/user/LoginPage";
import LogoutPage from "../pages/user/LogoutPage";
import ProfilePage from "../pages/user/ProfilePage";
import HomePage from "../pages/home/HomePage";
import GamesListPage from "../pages/games/GamesListPage";
import AddGamePage from "../pages/games/AddGamePage";
import EventsListPage from "../pages/events/EventsListPage";
import EventDetailsPage from "../pages/events/EventDetailsPage";
import AddEventPage from "../pages/events/AddEventPage";
import EditEventPage from "../pages/events/EditEventPage";
// Contexts
import { AppProvider } from "./context";
import { UserProvider } from "../pages/user/context";
import { GamesProvider } from "../pages/games/context";
import { EventsProvider } from "../pages/events/context";
// Util
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2A9D8F",
    },
    secondary: {
      main: "#E9C46A",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const App = () => (
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
                    <EventsListPage />
                  </PrivateRoute>
                  <PrivateRoute exact path="/events/add">
                    <AddEventPage />
                  </PrivateRoute>
                  <PrivateRoute path="/events/:eventId/edit">
                    <EditEventPage />
                  </PrivateRoute>
                  <PrivateRoute path="/events/:eventId">
                    <EventDetailsPage />
                  </PrivateRoute>
                  <PrivateRoute path="/games/add">
                    <AddGamePage />
                  </PrivateRoute>
                  <PrivateRoute path="/profile">
                    <ProfilePage />
                  </PrivateRoute>
                  <Route path="/login">
                    <LoginPage />
                  </Route>
                  <Route path="/logout">
                    <LogoutPage />
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

export default App;
