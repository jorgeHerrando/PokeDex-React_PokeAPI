import React, { useState, useEffect } from "react";
import axios from "axios";

// React-Bootstrap
import Row from "react-bootstrap/Row";

import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  // seteamos estados
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=251"
  );
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(url);
      console.log(res);
      setPokemons(res.data.results);
    }
    fetchData();
  }, []);

  return (
    <>
      {pokemons ? (
        <Row>
          {pokemons.map((pokemon, index) => {
            return (
              <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
            );
          })}
        </Row>
      ) : (
        <h1>Loading Pokemon...</h1>
      )}
    </>
  );
};

export default PokemonList;
