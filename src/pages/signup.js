import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    loading: false,
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
    const userData = {
      email: formState.email,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      handle: formState.handle,
      zipCode: formState.zipCode,
    };
    axios
      .post("/signup", userData)
      .then((res) => {
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setFormState({
          ...formState,
          loading: false,
        });
        window.location.href = "/";
      })
      .catch((err) => {
        console.error(err);
        setFormState({
          ...formState,
          errors: err.response.data,
          loading: false,
        });
      });
  };

  const { errors, loading } = formState;

  let form = loading ? (
    <p>Loading...</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={formState.email}
        name="email"
        id="email"
        placeholder="Enter email"
        type="email"
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        onChange={handleChange}
        value={formState.password}
        name="password"
        id="password"
        placeholder="Enter password"
        type="password"
      />
      {errors.general && <p>{errors.general}</p>}
      <input
        onChange={handleChange}
        value={formState.confirmPassword}
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm password"
        type="password"
      />
      {errors.general && <p>{errors.general}</p>}
      <input
        onChange={handleChange}
        value={formState.handle}
        name="handle"
        id="handle"
        placeholder="Enter handle"
        type="text"
      />
      <input
        onChange={handleChange}
        value={formState.zipCode}
        name="zipCode"
        id="zipCode"
        placeholder="Enter zip code"
        type="text"
      />
      <input type="submit" value="Sign Up" />
    </form>
  );

  return (
    <div>
      <h1>Signup page</h1>
      {form}
    </div>
  );
};

export default Login;
