import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";

const Home = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios
      .get("/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  let eventMarkup = events ? (
    events.map((event) => (
      <Link to={`/event/${event.eventId}`} key={event.eventId}>
        {event.body} - {moment(event.dateTime).format("MMMM Do, YYYY")}
      </Link>
    ))
  ) : (
    <Loading size={50} color={"#f7f7f7"} />
  );

  return (
    <Container>
      <EventList>
        <h2>Upcoming Events</h2>
        {eventMarkup}
      </EventList>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background: #052524;
  padding: 1rem 2rem;
  color: #f7f7f7;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;

  h1 {
    margin-top: 0;
    text-align: center;
  }

  img {
    max-width: 20%;
    margin: 0 auto;
    display: block;
  }
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
`;
