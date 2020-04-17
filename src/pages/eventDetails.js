import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loading from "../components/Loading";

const EventDetails = ({ match, token }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    axios
      .get(match.url)
      .then((res) => {
        console.log(res.data, token);
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [match]);

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
            <p>{comment.userHandle}</p>
          </div>
        ))}
      </>
    ) : (
      <p>Sure is quiet...</p>
    );

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/event/${match.params.eventId}`)
      .then((res) => {
        console.log(res);
        window.location.href = "/events";
      })
      .catch((err) => {
        console.error(err);
        setErrors(err.response.data);
      });
  };

  let detailBody = details && (
    <>
      <h1>{details.startingLocation}</h1>
      <h2>{details.dateTime}</h2>
      <p>{details.body}</p>
      {details.userId === token.user_id ? (
        <button className="btn btn--secondary" onClick={handleDelete}>
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
          <h2>Comments</h2>
          {comments}
        </>
      )}
    </Container>
  );
};

export default EventDetails;

const Container = styled.div`
  padding: 2rem;
`;
