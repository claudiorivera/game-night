import React from "react";
import { CssBaseline } from "@material-ui/core";
import { Router } from "@reach/router";
import { Register, Login, Home, MainAppBar, AlertDialog } from "./components";
import "fontsource-roboto";
import { GlobalProvider } from "./context";

function App() {
  return (
    <GlobalProvider>
      <CssBaseline />
      <MainAppBar />
      <AlertDialog />
      <Router>
        <Home path="home" />
        <Login path="login" />
        <Register path="register" />
      </Router>
    </GlobalProvider>
  );
}

export default App;
