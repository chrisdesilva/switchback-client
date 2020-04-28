import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import "./App.css";
import { GlobalStyle } from "./globals";

import AuthRoute from "./components/AuthRoute";
import Navbar from "./components/Navbar";
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import eventDetails from "./pages/eventDetails";

import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

axios.defaults.baseURL =
  "https://us-central1-switchback-d1be7.cloudfunctions.net/api";

const token = localStorage.FBIdToken;

if (token) {
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch(getUserData());
}

function App() {
  return (
    <Provider store={store}>
      <ParentContainer>
        <GlobalStyle />
        <Router>
          <Navbar />
          <ChildContainer>
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute path="/login" component={login} />
              <AuthRoute path="/signup" component={signup} />
              <Route exact path="/event/:eventId" component={eventDetails} />
            </Switch>
          </ChildContainer>
        </Router>
      </ParentContainer>
    </Provider>
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
