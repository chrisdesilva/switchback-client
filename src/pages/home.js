import React, { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Loading from "../components/Loading";
import PostEvent from "../components/PostEvent";

import { connect } from "react-redux";
import { getEvents, deleteEvent } from "../redux/actions/dataActions";

const Home = (props) => {
  const {
    data: { loading, events },
    authenticated,
    username,
  } = props;

  useEffect(() => {
    props.getEvents();
  }, []);

  let eventMarkup = loading ? (
    <Loading size={50} color={"#f7f7f7"} />
  ) : events.length === 0 ? (
    <p>No events here...</p>
  ) : (
    events.map((event) => (
      <div key={event.eventId}>
        <Link to={`/event/${event.eventId}`}>
          {event.body} - {moment(event.dateTime).format("MMMM Do, YYYY")}
        </Link>
        {username === event.username && (
          <button
            onClick={() => props.deleteEvent(event.eventId)}
            className="btn"
          >
            Delete
          </button>
        )}
      </div>
    ))
  );

  return (
    <Container>
      {authenticated && <PostEvent />}
      <EventList>
        <h2>Upcoming Events</h2>
        {eventMarkup}
      </EventList>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
  authenticated: state.user.authenticated,
  username: state.user.credentials.username,
});

export default connect(mapStateToProps, { getEvents, deleteEvent })(Home);

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
  position: relative;
  align-items: center;

  .btn {
    display: block;
    margin: 0.5rem auto 1rem auto;
    transition: background 300ms;

    :hover {
      background: red;
    }
  }
`;
