import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const AddComment = ({ match, details, setDetails }) => {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentList = document.getElementById("comments");
    const data = {
      body: comment,
    };
    axios
      .post(`/event/${match.params.eventId}/comment`, data)
      .then((res) => {
        const { comments } = details;
        comments.push(res.data);
        const newComment = document.createElement("div");
        commentList.insertAdjacentElement("afterbegin", newComment);
        setDetails({ ...details, comments });
        setComment("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        name="comment"
        value={comment}
        onChange={handleChange}
      />
      <input type="submit" className="btn btn-primary" value="add comment" />
    </Form>
  );
};

export default AddComment;

const Form = styled.form`
  margin: 2rem auto;
  padding: 2rem;
  width: 80%;
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
  }

  input:not(.btn) {
    margin: 1rem auto 0 auto;
    width: 90%;
    max-width: 20rem;
    display: block;
    border-bottom: 2px solid #30da8a;
  }

  img {
    width: 25%;
    margin: 0 auto;
    display: block;
  }

  .btn {
    display: block;
    margin: 1rem auto;
  }
`;
