import React from "react";
import { Provider } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { Router } from "@reach/router";
import { Register, Login, Dashboard, Welcome, MainAppBar } from "./components";
import store from "./store";
import "fontsource-roboto";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <MainAppBar />
      <Router>
        <Welcome path="/" />
        <Dashboard path="/dashboard" />
        <Login path="/login" />
        <Register path="/register" />
      </Router>
    </Provider>
  );
}

export default App;
