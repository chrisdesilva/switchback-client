import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

const Navbar = (props) => {
  const handleSignout = () => {
    props.logoutUser();
  };

  const {
    user: { authenticated },
  } = props;

  let accountNav = authenticated ? (
    <div>
      <Link to="/">All Events</Link>
      <button className="navButton" onClick={handleSignout}>
        Sign out
      </button>
    </div>
  ) : (
    <div>
      <Link to="/">All Events</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );

  return (
    <Container>
      <Nav>
        <Link to="/">
          {" "}
          <img src="./mtn-white.png" alt="Switchback logo" />
        </Link>
        {accountNav}
      </Nav>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);

const Container = styled.header`
  width: 100vw;
  background: rgba(0, 0, 0, 0.98);
`;

const Nav = styled.nav`
  position: fixed;
  z-index: 1;
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
