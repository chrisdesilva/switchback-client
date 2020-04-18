import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Login = ({ authenticated }) => {
  const [signup, setSignup] = useState(true);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    loading: false,
    zipCode: "",
    errors: {},
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({
      ...formState,
      loading: true,
    });
    let userData;
    if (signup) {
      userData = {
        email: formState.email,
        password: formState.password,
        confirmPassword: formState.confirmPassword,
        username: formState.username,
        zipCode: formState.zipCode,
      };
    } else {
      userData = {
        email: formState.email,
        password: formState.password,
      };
    }
    if (signup) {
      axios
        .post("/signup", userData)
        .then((res) => {
          localStorage.setItem("Token", `Bearer ${res.data.token}`);
          setFormState({
            ...formState,
            loading: false,
          });
          window.location.href = "/events";
        })
        .catch((err) => {
          console.error(err.response.data);
          setFormState({
            ...formState,
            errors: err.response.data,
            loading: false,
          });
        });
    } else {
      axios
        .post("/login", userData)
        .then((res) => {
          localStorage.setItem("Token", `Bearer ${res.data.token}`);
          console.log(res.data);
          setFormState({
            ...formState,
            loading: false,
          });
          window.location.href = "/events";
        })
        .catch((err) => {
          console.error(err);
          setFormState({
            ...formState,
            errors: err.response.data,
            loading: false,
          });
        });
    }
  };

  useEffect(() => {
    return authenticated ? (window.location.href = "/events") : null;
  }, [authenticated]);

  const { errors, loading } = formState;

  let loginForm = loading ? (
    <p>Loading...</p>
  ) : (
    <AnimatePresence>
      <LoginForm
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onSubmit={handleSubmit}
      >
        <img src="./sb-lightgreen.png" alt="Switchback logo" />
        <input
          onChange={handleChange}
          value={formState.email}
          name="email"
          id="email"
          placeholder="Enter email"
          type="email"
        />
        <input
          onChange={handleChange}
          value={formState.password}
          name="password"
          id="password"
          placeholder="Enter password"
          type="password"
        />
        {errors.general && <p>{errors.general}</p>}
        <input className="btn btn--primary" type="submit" value="Log in" />
        <p onClick={() => setSignup(true)}>
          New here? Click here to create an account.
        </p>
      </LoginForm>
    </AnimatePresence>
  );

  let signupForm = loading ? (
    <p>Loading...</p>
  ) : (
    <AnimatePresence>
      <SignupForm
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onSubmit={handleSubmit}
      >
        <img src="./sb-darkgreen.png" alt="Switchback logo" />
        <input
          onChange={handleChange}
          value={formState.email}
          name="email"
          id="email"
          placeholder="Enter email"
          type="email"
          className="input"
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          onChange={handleChange}
          value={formState.password}
          name="password"
          id="password"
          placeholder="Enter password"
          type="password"
          className="input"
        />
        {errors.password && <p>{errors.password}</p>}
        <input
          onChange={handleChange}
          value={formState.confirmPassword}
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
          type="password"
          className="input"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <input
          onChange={handleChange}
          value={formState.username}
          name="username"
          id="username"
          placeholder="Enter username"
          type="text"
          className="input"
        />
        {errors.username && <p>{errors.username}</p>}
        <input
          onChange={handleChange}
          value={formState.zipCode}
          name="zipCode"
          id="zipCode"
          placeholder="Enter zip code"
          type="text"
          className="input"
        />
        {errors.zipCode && <p>{errors.zipCode}</p>}
        <input type="submit" value="Sign Up" className="btn btn--primary" />
        <p onClick={() => setSignup(false)}>
          Already have an account? Click here to sign in.
        </p>
      </SignupForm>
    </AnimatePresence>
  );

  return <Container>{signup ? signupForm : loginForm}</Container>;
};

export default Login;

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
