import React from "react";

import { Link } from "react-router-dom";

import Pokeball from "../../assets/Pokeball.svg";

// React-Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const NavBar = () => {
  return (
    <React.Fragment>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container className="container-navbar">
          <Link to="/" className="link-home-navbar">
            Pokemon
            <img
              alt="pokeball"
              src={Pokeball}
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
            Showroom
          </Link>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBar;
