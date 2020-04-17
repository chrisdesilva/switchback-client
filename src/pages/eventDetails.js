import React, { useEffect, useState } from "react";
import axios from "axios";

const EventDetails = ({ match }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios
      .get(match.url)
      .then((response) => {
        console.log(response);
        setDetails(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  let comments =
    details && details.comments.length ? (
      details.comments.map((comment) => (
        <div key={comment.createdAt}>
          <p>{comment.body}</p>
          <img
            src={comment.userImage}
            alt={comment.userImage}
            style={{ maxWidth: "5rem" }}
          />
          <p>{comment.userHandle}</p>
        </div>
      ))
    ) : (
      <p>Sure is quiet...</p>
    );

  return (
    <div>
      <h1>{details && details.address}</h1>
      <h2>Comments</h2>
      {comments}
    </div>
  );
};

export default EventDetails;
