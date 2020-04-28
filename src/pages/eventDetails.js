import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import Loading from "../components/Loading";
import AddComment from "../components/AddComment";

import { connect } from "react-redux";
import { getEvent } from "../redux/actions/dataActions";

const EventDetails = (props) => {
  const {
    UI: { loading, errors },
    event,
  } = props;

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
  }, []);

  let detailBody = event && (
    <>
      <h1>{event.startingLocation}</h1>
      <h2>{moment(event.dateTime).format("MMMM Do, YYYY")}</h2>
      <p>{event.body}</p>
      {errors && <small>{errors.error}</small>}
    </>
  );

  return (
    <Container>
      {loading ? (
        <Loading loading={loading} color={"#f7f7f7"} size={100} />
      ) : (
        <>{detailBody}</>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  UI: state.UI,
  event: state.data.event,
});

export default connect(mapStateToProps, { getEvent })(EventDetails);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
