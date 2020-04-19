import React from "react";
import "./App.css";
import styled from "styled-components";
import { GlobalStyle } from "./globals";
import jwtDecode from "jwt-decode";
import Events from "./pages/events";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import EventDetails from "./pages/eventDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

let authenticated = false;
const token = localStorage.Token;
axios.defaults.baseURL =
  "https://us-central1-switchback-d1be7.cloudfunctions.net/api";

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
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
            <Route
              exact
              path="/"
              render={(props) => (
                <Login {...props} authenticated={authenticated} />
              )}
            />
            <Route
              path="/events"
              render={(props) => (
                <Events
                  {...props}
                  authenticated={authenticated}
                  token={token}
                />
              )}
            />
            <Route
              path="/event/:eventId"
              render={(props) => (
                <EventDetails {...props} authenticated={authenticated} />
              )}
            />
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
