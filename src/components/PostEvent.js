import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { connect } from "react-redux";
import { postEvent, clearErrors } from "../redux/actions/dataActions";
import Loading from "./Loading";

const PostEvent = (props) => {
  const {
    UI: { loading, errors },
  } = props;
  const [postErrors, setPostErrors] = useState({});
  const [formData, setFormData] = useState({
    body: "",
    dateTime: "",
    address: "",
    startingLocation: "",
  });

  useEffect(() => {
    if (errors) {
      setPostErrors(errors);
    }
    if (!errors && !loading) {
      setFormData({
        body: "",
        dateTime: "",
        address: "",
        startingLocation: "",
      });
      setPostErrors({});
    }
  }, [errors, loading]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.postEvent({
      body: formData.body,
      dateTime: formData.dateTime,
      address: formData.address,
      startingLocation: formData.startingLocation,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add New Event</h2>
      <label htmlFor="body">
        Description &nbsp;
        {postErrors.body && (
          <AnimatePresence>
            <small
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {postErrors.body}
            </small>
          </AnimatePresence>
        )}
      </label>
      <input
        name="body"
        type="text"
        value={formData.body}
        placeholder="Brief description of your event"
        onChange={handleChange}
        id="body"
      />

      <label htmlFor="dateTime">
        Date & Time&nbsp;
        {postErrors.dateTime && (
          <AnimatePresence>
            <small
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {postErrors.dateTime}
            </small>
          </AnimatePresence>
        )}
      </label>
      <input
        name="dateTime"
        type="date"
        value={formData.dateTime}
        placeholder="Date of event"
        onChange={handleChange}
        id="dateTime"
      />
      <label htmlFor="address">
        Address&nbsp;
        {postErrors.address && (
          <AnimatePresence>
            <small
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {postErrors.address}
            </small>
          </AnimatePresence>
        )}
      </label>
      <input
        name="address"
        type="text"
        value={formData.address}
        placeholder="Address of meeting point"
        onChange={handleChange}
        id="address"
      />
      <label htmlFor="startingLocation">
        Starting Location&nbsp;
        {postErrors.startingLocation && (
          <AnimatePresence>
            <small
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {postErrors.startingLocation}
            </small>
          </AnimatePresence>
        )}
      </label>
      <input
        name="startingLocation"
        type="text"
        value={formData.startingLocation}
        placeholder="Specific time and place to meet (trailhead, visitor center, etc.)"
        onChange={handleChange}
        id="startingLocation"
      />
      <button disabled={loading} type="submit" className="btn btn--primary">
        Add Event {loading && <Loading color="#0d0d0d" size={8} />}
      </button>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  postEvent,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(PostEvent);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1rem;
  background: #0d0d0d;
  padding: 2rem 2rem 4rem 2rem;

  small {
    text-align: center;
    color: red;
    margin-bottom: 1rem;
  }

  h2 {
    text-align: center;
  }

  input {
    margin: 0 auto 1rem auto;
  }

  label {
    margin: 0 auto;
  }

  input,
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
