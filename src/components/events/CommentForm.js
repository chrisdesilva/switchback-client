import React from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Loading from "../Loading";

const CommentForm = ({
  formErrors,
  body,
  handleSubmit,
  handleChange,
  loading,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="body">
        Comment &nbsp;
        {formErrors && (
          <AnimatePresence>
            <small
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {formErrors.comment}
            </small>
          </AnimatePresence>
        )}
      </label>
      <textarea
        name="body"
        value={body}
        placeholder="Leave a comment"
        onChange={handleChange}
        id="body"
      />
      <button type="submit" className="btn">
        {loading ? <Loading color="#0d0d0d" size={8} /> : "Post Comment"}
      </button>{" "}
    </Form>
  );
};

export default CommentForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1rem;
  background: #0d0d0d;
  padding: 1rem 1rem 2rem 1rem;
  width: 50%;

  small {
    text-align: center;
    color: red;
    margin-bottom: 1rem;
  }

  h2 {
    text-align: center;
  }

  textarea {
    margin: 0 auto 1rem auto;
    border: 2px solid #c4c4c4;
  }

  label {
    color: #f7f7f7;
    margin: 0 auto;
  }

  textarea,
  label {
    width: 50%;
  }

  label {
    font-size: 0.75rem;
  }

  .btn {
    margin: 0 auto;
    position: relative;
  }
`;
