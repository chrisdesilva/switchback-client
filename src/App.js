import React from "react";
import "./App.css";
import styled from "styled-components";
import { GlobalStyle } from "./globals";
import jwtDecode from "jwt-decode";
import events from "./pages/events";
import login from "./pages/login";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";
import eventDetails from "./pages/eventDetails";
import AuthRoute from "./components/AuthRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL =
  "https://us-central1-switchback-d1be7.cloudfunctions.net/api";

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
    localStorage.clear();
  } else {
    axios.defaults.headers.common["Authorization"] = token;
    authenticated = true;
  }
}

function App() {
  return (
    <ParentContainer>
      <GlobalStyle />
      <Router>
        <Navbar authenticated={authenticated} />
        <ChildContainer>
          <Switch>
            <Route exact path="/" component={login} />
            <Route path="/events" component={events} />
            <AuthRoute
              exact
              path="/login"
              component={login}
              authenticated={authenticated}
            />
            <Route path="/event/:eventId" component={eventDetails} />
          </Switch>
        </ChildContainer>
      </Router>
    </ParentContainer>
  );
}

export default App;

const ParentContainer = styled.div`
  background-size: cover;
`;

const ChildContainer = styled.div`
  max-width: 1200px;
  margin: 52px auto 0 auto;
  background: #30da8a;
  min-height: 100vh;
`;
