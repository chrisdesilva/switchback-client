import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const Signup = (props) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    loading: false,
    zipCode: "",
    errors: {},
  });

  const {
    UI: { loading },
  } = props;
  const {
    errors,
    password,
    email,
    confirmPassword,
    username,
    zipCode,
  } = formState;

  useEffect(() => {
    if (props.UI.errors) {
      setFormState({
        ...formState,
        errors: props.UI.errors,
      });
    }
  }, [props.UI.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({
      ...formState,
      loading: true,
    });
    const newUserData = {
      email: formState.email,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      username: formState.username,
      zipCode: formState.zipCode,
    };
    props.signupUser(newUserData, props.history);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <AnimatePresence>
      <Container>
        <SignupForm
          exit={{ opacity: 0, x: -50 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit}
        >
          <img src="./sb-darkgreen.png" alt="Switchback logo" />
          <input
            onChange={handleChange}
            value={email}
            name="email"
            id="email"
            placeholder="Enter email"
            type="email"
            className="input"
          />
          {errors.email && <small>{errors.email}</small>}
          <input
            onChange={handleChange}
            value={password}
            name="password"
            id="password"
            placeholder="Enter password"
            type="password"
            className="input"
          />
          {errors.password && <small>{errors.password}</small>}
          <input
            onChange={handleChange}
            value={confirmPassword}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm password"
            type="password"
            className="input"
          />
          {errors.confirmPassword && <small>{errors.confirmPassword}</small>}
          <input
            onChange={handleChange}
            value={username}
            name="username"
            id="username"
            placeholder="Enter username"
            type="text"
            className="input"
          />
          {errors.username && <small>{errors.username}</small>}
          <input
            onChange={handleChange}
            value={zipCode}
            name="zipCode"
            id="zipCode"
            placeholder="Enter zip code"
            type="text"
            className="input"
          />
          {errors.zipCode && <small>{errors.zipCode}</small>}
          <button disabled={loading} className="btn btn--primary" type="submit">
            {loading ? <Loading color="#f7f7f7" size={8} /> : "Signup"}
          </button>
          <p>
            Already have an account? Click <Link to="/login">here</Link> to sign
            in.
          </p>
        </SignupForm>
      </Container>
    </AnimatePresence>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(Signup);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

const Form = css`
  margin: 2rem auto;
  padding: 2rem;
  width: 60%;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #000;

  small {
    text-align: center;
    color: red;
    display: block;
  }

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
  }

  img {
    width: 25%;
    margin: 0 auto;
    display: block;
  }

  .btn {
    position: relative;
    display: block;
    margin: 1rem auto;
  }
`;

const SignupForm = styled(motion.form)`
  ${Form}
  img {
    width: 20%;
    margin: 0 auto;
    display: block;
  }
  background: #f7f7f7;

  p {
    color: #052524;
  }

  h2 {
    color: #052524;
  }

  .input {
    color: #052524;
    border-bottom: 2px solid #052524;
  }

  .btn {
    background: #30da8a;
    color: #111;
    border: 2px solid #052524;
    transition: color 300ms, background 300ms;

    :hover {
      background: #111;
      color: #30da8a;
    }
  }
`;
