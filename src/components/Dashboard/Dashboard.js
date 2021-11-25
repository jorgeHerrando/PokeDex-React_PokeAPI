import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PokemonList from "../pokemon/PokemonList";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Row className="pokemon-list-container">
        <Col>
          <PokemonList />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Dashboard;
