import React, { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaTrashAlt, FaComment, FaCalendarCheck } from "react-icons/fa";

import Loading from "../components/Loading";
import PostEvent from "../components/events/PostEvent";

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
    <Loading size={20} color={"#f7f7f7"} />
  ) : events.length === 0 ? (
    <p>No events here...</p>
  ) : (
    events.map((event) => (
      <div className="event" key={event.eventId}>
        <div className="event__title">
          <Link to={`/event/${event.eventId}`}>
            {event.body} - {moment(event.dateTime).format("MMMM Do, YYYY")}
          </Link>
          {username === event.username && (
            <FaTrashAlt onClick={() => props.deleteEvent(event.eventId)} />
          )}
        </div>
        <div className="event__interaction">
          <div>
            <FaComment />
            &nbsp;{event.commentCount}&nbsp;
            {event.commentCount === 1 ? "comment" : "comments"}
          </div>
          <div>
            <FaCalendarCheck />
            &nbsp;{event.likeCount}&nbsp;
            {event.likeCount === 1 ? "RSVP" : "RSVPs"}
          </div>
        </div>
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

  .event {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    width: 50%;
    align-items: center;

    &__title {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      svg {
        transition: color 300ms;
        color: #f7f7f7;
        cursor: pointer;
        margin-left: 0.5rem;

        :hover {
          color: red;
        }
      }
    }

    &__interaction {
      display: flex;
      div {
        margin: 0 1rem;
      }
    }
  }
`;
