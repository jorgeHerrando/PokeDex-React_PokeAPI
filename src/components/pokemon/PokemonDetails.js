import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import Next from "../../assets/next.png";

// React-Bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import axios from "axios";

// give colors to different types
const colorsType = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F481F4",
  fighting: "82351D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

const PokemonDetails = () => {
  // retrieve params value
  let { id } = useParams();
  //   console.log(id);

  // states
  const [name, setName] = useState("");
  const [pokeIndex, setPokeIndex] = useState(Number(id));
  const [imageUrl, setImageUrl] = useState("");
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState({
    hp: "",
    attack: "",
    defense: "",
    spped: "",
    specialAttack: "",
    specialDefense: "",
  });
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [abilities, setAbilities] = useState();

  const [onhold, setOnhold] = useState(false);

  // ComponentDidMount, DidUpdate
  useEffect(() => {
    const getPokemonData = async function () {
      // URL for pokemon information
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokeIndex}`;

      // Get pokemon information
      const pokemon = await axios.get(pokemonUrl);
      //   console.log(pokemon);

      // info we need
      const name = pokemon.data.name;
      //   console.log(name);
      const imageUrl = pokemon.data.sprites.other.dream_world.front_default;
      //   console.log(imageUrl);

      // save stats
      let stats = {};
      pokemon.data.stats.map((stat) => {
        return (stats[stat.stat.name] = stat.base_stat);
      });
      //   console.log(stats);

      // convert dm to m. Rounding to decimal
      const height = ((pokemon.data.height * 0.1 * 100) / 100).toFixed(1);
      //   console.log(height);

      // convert hg to kg. Rounding to decimal
      const weight = ((pokemon.data.weight * 0.1 * 100) / 100).toFixed(1);
      //   console.log(weight);

      const types = pokemon.data.types.map((type) => type.type.name);
      //   console.log(types);

      const abilities = pokemon.data.abilities.map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map((elem) => elem.charAt(0).toUpperCase() + elem.substring(1))
          .join(" ");
      });
      //   console.log(abilities);

      // Set states
      setName(name);
      setImageUrl(imageUrl);
      setStats(stats);
      setHeight(height);
      setWeight(weight);
      setTypes(types);
      setAbilities(abilities);

      console.log(name, imageUrl, stats, height, weight, types, abilities);
    };
    getPokemonData();
  }, [pokeIndex]);

  const nextPage = function (number) {
    setOnhold(true);
    if (number !== 251) {
      setPokeIndex(number + 1);
    } else {
      setPokeIndex(1);
    }
    setOnhold(false);
  };
  const previousPage = function (number) {
    setOnhold(true);
    if (number !== 1) {
      setPokeIndex(number - 1);
    } else {
      setPokeIndex(251);
    }
    setOnhold(false);
  };

  return (
    <React.Fragment>
      {pokeIndex < 251 && pokeIndex > 1 && (
        <div className="pokemon-detail-arrows-container">
          <Link
            onClick={() => previousPage(pokeIndex)}
            disabled={onhold}
            to={`/pokemon/${pokeIndex - 1}`}
          >
            <img className="previous-arrow" src={Next} alt="previous" />
          </Link>
          <Link
            onClick={() => nextPage(pokeIndex)}
            disabled={onhold}
            to={`/pokemon/${pokeIndex + 1}`}
          >
            <img className="next-arrow" src={Next} alt="next" />
          </Link>
        </div>
      )}

      {pokeIndex === 251 && (
        <div className="pokemon-detail-arrows-container">
          <Link
            onClick={() => previousPage(pokeIndex)}
            disabled={onhold}
            to={`/pokemon/${pokeIndex - 1}`}
          >
            <img className="previous-arrow" src={Next} alt="previous" />
          </Link>
          <Link
            onClick={() => nextPage(pokeIndex)}
            disabled={onhold}
            to={`/pokemon/1`}
          >
            <img className="next-arrow" src={Next} alt="next" />
          </Link>
        </div>
      )}

      {pokeIndex === 1 && (
        <div className="pokemon-detail-arrows-container">
          <Link
            onClick={() => previousPage(pokeIndex)}
            disabled={onhold}
            to={`/pokemon/251`}
          >
            <img className="previous-arrow" src={Next} alt="previous" />
          </Link>
          <Link
            onClick={() => nextPage(pokeIndex)}
            disabled={onhold}
            to={`/pokemon/${pokeIndex + 1}`}
          >
            <img className="next-arrow" src={Next} alt="next" />
          </Link>
        </div>
      )}

      <section className="pokemon-info">
        <Col
          as="article"
          className="pokemon-detail-container"
          xs={11}
          sm={8}
          xl={7}
        >
          <div className="pokemon-detail-top">
            <h4>
              {name
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
                .join(" ")}
            </h4>
            <h4># {pokeIndex}</h4>
          </div>

          <div className="pokemon-detail-body">
            <div className="pokemon-data">
              <div className="pokemon-image-container">
                <img src={imageUrl} alt="pokemon" className="pokemon-image" />
              </div>
              <div className="pokemon-maindata">
                <div className="pokemon-data-left">
                  <div className="pokemon-data-type">
                    <h4>Type:</h4>
                    <div className="pokemon-badges">
                      {types.map((type, i) => {
                        return (
                          <span
                            key={i}
                            className="badge badge-pill"
                            style={{ backgroundColor: `#${colorsType[type]}` }}
                          >
                            {type
                              .toLowerCase()
                              .split(" ")
                              .map(
                                (oneType) =>
                                  oneType.charAt(0).toUpperCase() +
                                  oneType.substring(1)
                              )
                              .join(" ")}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pokemon-data-height">
                    <h4>Height: {`${height}m`}</h4>
                  </div>
                  <div className="pokemon-data-weight">
                    <h4>Weight: {`${weight}kg`}</h4>
                  </div>
                </div>
                <div className="pokemon-data-abilities">
                  <h4>Abilities</h4>
                  {abilities ? (
                    abilities.map((ability) => {
                      return <p className="ability-p">{ability}</p>;
                    })
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pokemon-data-stats">
              <h2>Stats</h2>
              {Object.entries(stats).map(([key, subject], i) => {
                return (
                  <div className="row align-items-center" key={i}>
                    <div className="col-12 col-md-3">{key.toUpperCase()}</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${subject / 1.5}%`,
                          }}
                          aria-valuemin="0"
                          aria-valuemax="150"
                        >
                          <small>{subject}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </section>

      <div className="home-button">
        <Link to="/">
          <Button variant="primary">Back to home</Button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default PokemonDetails;
