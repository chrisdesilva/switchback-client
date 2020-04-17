import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = ({ authenticated }) => {
  const handleSignout = () => {
    localStorage.removeItem("Token");
    window.location.href = "/";
  };

  return (
    <Container>
      <Nav>
        {authenticated ? (
          <>
            <Link to="/events">
              {" "}
              <img src="./mtn-white.png" alt="Switchback logo" />
            </Link>
            <div>
              <Link to="/events">Events</Link>
              <button className="navButton" onClick={handleSignout}>
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/">
              <img src="./mtn-white.png" alt="Switchback logo" />
            </Link>
            <div>
              <Link to="/events">Events</Link>
              <Link to="/">Login/Signup</Link>
            </div>
          </>
        )}
      </Nav>
    </Container>
  );
};

export default Navbar;

const Container = styled.header`
  width: 100vw;
  background: rgba(0, 0, 0, 0.98);
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.98);
  padding: 1rem 0;

  img {
    height: 2rem;
  }

  a,
  .navButton {
    cursor: pointer;
    padding: 0;
    text-decoration: none;
    color: #41d18a;
    background: none;
    border: none;
    font-size: 1rem;
    margin: 0 1rem;
    font-weight: bold;
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }
  div {
    display: flex;
  }
`;
