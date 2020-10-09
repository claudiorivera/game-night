import React from "react";

// import LoginPage from "../components/user/LoginPage";
// import LogoutPage from "../components/user/LogoutPage";
// import ProfilePage from "../components/user/ProfilePage";
import HomePage from "../components/home/HomePage";
// import GamesListPage from "../components/games/GamesListPage";
// import AddGamePage from "../components/games/AddGamePage";
// import EventsListPage from "../components/events/EventsListPage";
// import EventDetailsPage from "../components/events/EventDetailsPage";
// import AddEventPage from "../components/events/AddEventPage";
// import EditEventPage from "../components/events/EditEventPage";

const Home = () => (
  <div>
    <HomePage />
    {/* <Router>
      <Switch>
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
    </Router> */}
  </div>
);

export default Home;
