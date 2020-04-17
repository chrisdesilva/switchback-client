import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";

const Events = () => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  let eventsMarkup = events ? (
    events.map((event) => (
      <Link to={`/event/${event.eventId}`} key={event.eventId}>
        {event.body} - {event.dateTime}
      </Link>
    ))
  ) : (
    <Loading loading={loading} size={50} color={"#f7f7f7"} />
  );

  return (
    <Container>
      <img src="./sb-color.png" alt="Switchback logo" />
      <EventList>
        <h2>Upcoming Event</h2>
        {eventsMarkup}
      </EventList>
    </Container>
  );
};

export default Events;

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
