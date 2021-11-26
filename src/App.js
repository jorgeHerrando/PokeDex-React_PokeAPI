import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import PokemonDetails from "./components/pokemon/PokemonDetails";
import Footer from "./components/layout/Footer";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="mainContainer">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
