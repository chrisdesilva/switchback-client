import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const Login = (props) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    loading: false,
    errors: {},
  });

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
    const userData = {
      email: formState.email,
      password: formState.password,
    };

    props.loginUser(userData, props.history);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const {
    UI: { loading },
  } = props;
  const { errors, password, email } = formState;

  return (
    <AnimatePresence>
      <Container>
        <LoginForm
          exit={{ opacity: 0, x: 50 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit}
        >
          <img src="./sb-lightgreen.png" alt="Switchback logo" />
          <input
            onChange={handleChange}
            value={email}
            name="email"
            id="email"
            placeholder="Enter email"
            type="email"
          />
          <input
            onChange={handleChange}
            value={password}
            name="password"
            id="password"
            placeholder="Enter password"
            type="password"
          />
          {errors.general && <p>{errors.general}</p>}
          <input
            disabled={loading}
            className="btn btn--primary"
            type="submit"
            value="Log in"
          />
          <p>
            New here? Click <Link to="/signup">here</Link> to create an account.
          </p>
        </LoginForm>
      </Container>
    </AnimatePresence>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);

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
    display: block;
    margin: 1rem auto;
  }
`;

const LoginForm = styled(motion.form)`
  ${Form}
  background: #052524;

  p {
    color: #f7f7f7;
  }

  h2 {
    color: #f7f7f7;
  }
`;
