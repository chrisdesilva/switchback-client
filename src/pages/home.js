import React, { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEvents } from "../redux/actions/dataActions";
import styled from "styled-components";
import Loading from "../components/Loading";
import PostEvent from "../components/PostEvent";

const Home = (props) => {
  const { loading, events } = props.data;

  useEffect(() => {
    props.getEvents();
  }, []);

  let eventMarkup = !loading ? (
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
      {props.authenticated && <PostEvent />}
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
});

export default connect(mapStateToProps, { getEvents })(Home);

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
`;
