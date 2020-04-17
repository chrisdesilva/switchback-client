import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
  font-family: "PT Sans", sans-serif;
}
  a {
    text-decoration: none;
    color: #41d18a;
    font-family: "PT Sans", sans-serif;
  }

  button {
    font-family: "PT Sans", sans-serif;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    border: none;
    border-bottom: 2px solid #c4c4c4;
    padding: .5rem;
    font-family: "PT Sans", sans-serif;
    background: transparent;
    color: #30DA8A;
    text-transform: uppercase;
  }

  .btn {
    border: none;
    cursor: pointer;
    padding: .5rem 1rem;
    width: 10rem;
    text-transform: uppercase;
  }

  .btn--primary {
    background: #f7f7f7;
    color: #052524;
    border: 2px solid #30DA8A;
    transition: color 300ms, background 300ms;

    :hover {
      color: #052524;
    background: #30DA8A;
    }
  }
`;
