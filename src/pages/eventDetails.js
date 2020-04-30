import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";

import { FaTrashAlt } from "react-icons/fa";

import Loading from "../components/Loading";
import CommentForm from "../components/CommentForm";

import { connect } from "react-redux";
import {
  getEvent,
  deleteEvent,
  commentOnEvent,
  deleteComment,
} from "../redux/actions/dataActions";

const EventDetails = (props) => {
  const [body, setBody] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const {
    UI: { loading, errors },
    event,
    user: {
      authenticated,
      credentials: { userId },
    },
    loadingData,
  } = props;

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.commentOnEvent(event.eventId, { body });
  };

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
  }, []);

  useEffect(() => {
    if (errors) {
      setFormErrors(errors);
    }
    if (!errors && !loadingData) {
      setFormErrors({});
      setBody("");
    }
  }, [errors, loadingData]);

  let detailBody = event && (
    <>
      <h1>{event.startingLocation}</h1>
      <h2>{moment(event.dateTime).format("MMMM Do, YYYY")}</h2>
      <p>{event.body}</p>
      {authenticated && (
        <CommentForm
          handleSubmit={handleSubmit}
          body={body}
          setBody={setBody}
          formErrors={formErrors}
          handleChange={handleChange}
          loading={loadingData}
        />
      )}
      <h2>Comments</h2>
      {event.comments ? (
        event.comments.map((comment) => (
          <div className="comment">
            <div className="comment__image">
              <img src={comment.userImage} alt="profile" />
            </div>
            <div className="comment__content">
              <p>{comment.body}</p>
              <small>
                {comment.username} - {moment(comment.createdAt).fromNow()}
              </small>
              {comment.userId === userId && (
                <FaTrashAlt
                  onClick={() => props.deleteComment(comment.commentId)}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet...</p>
      )}
    </>
  );

  return (
    <Container>
      {loading ? (
        <Loading loading={loading} color={"#f7f7f7"} size={20} />
      ) : (
        <>{detailBody}</>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  event: state.data.event,
  loadingData: state.data.loading,
});

const mapActionsToProps = {
  getEvent,
  deleteEvent,
  commentOnEvent,
  deleteComment,
};

export default connect(mapStateToProps, mapActionsToProps)(EventDetails);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .comment {
    width: 50%;
    display: flex;
    border: 2px solid #0d0d0d;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background: #c4c4c4;

    svg {
      position: absolute;
      right: 1rem;
      bottom: 0.5rem;
      cursor: pointer;
      transition: color 300ms;

      :hover {
        color: red;
      }
    }

    &__image {
      width: 25%;
      img {
        max-width: 100px;
      }
    }

    &__content {
      width: 75%;
      display: flex;
      flex-direction: column;
      position: relative;
    }
  }
`;
