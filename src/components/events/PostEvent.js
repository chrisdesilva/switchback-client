import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postEvent, clearErrors } from "../../redux/actions/dataActions";
import EventForm from "./EventForm";

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
    <EventForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      postErrors={postErrors}
      loading={loading}
    />
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
