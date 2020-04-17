import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";

const Events = ({ authenticated, token }) => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({
    address: "",
    body: "",
    dateTime: "",
    startingLocation: "",
    errors: {},
    loading: false,
  });

  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
        console.log(response);
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

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({
      ...formState,
      loading: true,
    });
    let eventData = {
      address: formState.address,
      body: formState.body,
      dateTime: formState.dateTime,
      startingLocation: formState.startingLocation,
    };

    axios
      .post("/event", eventData)
      .then(() => {
        setFormState({ ...formState, loading: false });
        window.location.href = "/events";
      })
      .catch((err) => {
        console.error(err.response.data);
        setFormState({
          ...formState,
          errors: err.response.data,
          loading: false,
        });
      });
  };

  const { errors } = formState;

  return (
    <Container>
      <img src="./sb-color.png" alt="Switchback logo" />
      {authenticated ? (
        <NewEvent onSubmit={handleSubmit}>
          <h2>Add An Event</h2>
          <textarea
            name="body"
            id="body"
            placeholder="Enter a description of the event"
            onChange={handleChange}
            value={formState.body}
          />
          {errors.body && <p>{errors.body}</p>}
          <input
            name="startingLocation"
            id="startingLocation"
            placeholder="Where are we meeting?"
            onChange={handleChange}
            value={formState.startingLocation}
            type="text"
          />
          {errors.startingLocation && <p>{errors.startingLocation}</p>}
          <input
            name="address"
            id="address"
            placeholder="Address of starting point"
            onChange={handleChange}
            value={formState.address}
            type="text"
          />
          {errors.address && <p>{errors.address}</p>}
          <input
            name="dateTime"
            id="dateTime"
            placeholder="Enter a date and time to meet"
            onChange={handleChange}
            value={formState.dateTime}
            type="text"
          />
          <input className="btn btn--primary" type="submit" value="Add event" />
        </NewEvent>
      ) : null}
      <EventList>
        <h2>Upcoming Events</h2>
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

const NewEvent = styled.form`
  margin: 2rem auto;
  padding: 2rem;
  width: 60%;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #000;
  background: #f7f7f7;

  p {
    cursor: pointer;
    text-align: center;
  }

  h2 {
    margin-top: 0;
    text-align: center;
    color: #052524;
  }

  input:not(.btn),
  textarea {
    margin: 1rem auto 0 auto;
    width: 90%;
    max-width: 20rem;
    display: block;
    color: #052524;
    border-bottom: 2px solid #052524;
  }

  textarea {
    border: 2px solid #052524;
    font-size: 0.8rem;
  }

  .btn {
    display: block;
    margin: 1rem auto;
    border: 2px solid #052524;
  }
`;
