import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import Loading from "../components/Loading";
import AddComment from "../components/AddComment";

const EventDetails = ({ match, token, authenticated }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    axios
      .get(match.url)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [match.url]);

  const handleDeleteComment = (commentId) => {
    setDetails({
      ...details,
      comments: details.comments.filter(
        (comment) => comment.commentId !== commentId
      ),
    });
    axios
      .delete(`/comment/${commentId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteEvent = () => {
    axios
      .delete(`/event/${match.params.eventId}`)
      .then((res) => {
        window.location.href = "/events";
      })
      .catch((err) => {
        console.error(err);
        setErrors(err.response.data);
      });
  };

  let comments =
    details && details.comments.length && !loading ? (
      <>
        {details.comments.map((comment) => (
          <div key={comment.createdAt}>
            <p>{comment.body}</p>
            <img
              src={comment.userImage}
              alt={comment.userImage}
              style={{ maxWidth: "5rem" }}
            />
            <p>{comment.username}</p>
            {authenticated && (
              <FaTrashAlt
                onClick={() => handleDeleteComment(comment.commentId)}
              />
            )}
          </div>
        ))}
      </>
    ) : (
      <p>Sure is quiet...</p>
    );

  let detailBody = details && (
    <>
      <h1>{details.startingLocation}</h1>
      <h2>{moment(details.dateTime).format("MMMM Do, YYYY")}</h2>
      <p>{details.body}</p>
      {token && details.userId === token.user_id ? (
        <button className="btn btn--secondary" onClick={handleDeleteEvent}>
          Delete Event
        </button>
      ) : null}
      {errors && <p>{errors.error}</p>}
    </>
  );

  return (
    <Container>
      {loading ? (
        <Loading loading={loading} color={"#f7f7f7"} size={100} />
      ) : (
        <>
          {detailBody}
          {authenticated && (
            <AddComment
              match={match}
              details={details}
              setDetails={setDetails}
            />
          )}
          <h2>Comments</h2>
          <div id="comments">{comments}</div>
        </>
      )}
    </Container>
  );
};

export default EventDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
