import React from "react";
import "./App.css";
import styled from "styled-components";
import { GlobalStyle } from "./globals";
import jwtDecode from "jwt-decode";
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";
import eventDetails from "./pages/eventDetails";
import AuthRoute from "./components/AuthRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
    localStorage.clear();
  } else {
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
            <Route exact path="/" component={home} />
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
  margin: 53px auto 0 auto;
  background: #30da8a;
  min-height: 100vh;
`;
