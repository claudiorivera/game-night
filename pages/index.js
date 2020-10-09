import Head from "next/head";
import React from "react";
import "fontsource-roboto";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// App components
import AlertDialog from "../components/AlertDialog";
import MainAppBar from "../components/MainAppBar";
import PrivateRoute from "../components/PrivateRoute";
// Pages
import LoginPage from "../components/user/LoginPage";
import LogoutPage from "../components/user/LogoutPage";
import ProfilePage from "../components/user/ProfilePage";
import HomePage from "../components/home/HomePage";
import GamesListPage from "../components/games/GamesListPage";
import AddGamePage from "../components/games/AddGamePage";
import EventsListPage from "../components/events/EventsListPage";
import EventDetailsPage from "../components/events/EventDetailsPage";
import AddEventPage from "../components/events/AddEventPage";
import EditEventPage from "../components/events/EditEventPage";
// Contexts
import { AppProvider } from "../context";
import { UserProvider } from "../components/user/context";
import { GamesProvider } from "../components/games/context";
import { EventsProvider } from "../components/events/context";
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

const Home = () => (
  <div>
    <Head>
      <title>Game Night</title>
    </Head>
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
  </div>
);
export default Home;
