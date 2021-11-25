import React, { useState, useEffect } from "react";

import Image from "react-bootstrap/Image";
import Spinner from "../../assets/Spinner-2.gif";

// React-Bootstrap
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

const PokemonCard = (props) => {
  // seteamos estados
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pokemonIndex, setPokemonIndex] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getInfo() {
      const { url } = props;
      //   console.log(url);
      // creamos array con elem con / como separador
      const urlSplit = url.split("/");
      //   console.log(urlSplit);
      // el length -2 corresponde al index
      const pokemonIndex = urlSplit[urlSplit.length - 2];
      // console.log(pokemonIndex);

      // seteamos la imagen
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonIndex}.svg`;

      // cambiamos estados
      setName(props.name);
      setPokemonIndex(pokemonIndex);
      setImageUrl(imageUrl);
      setLoading(false);
    }

    getInfo();
    console.log(name, pokemonIndex, imageUrl, loading);
  });

  return (
    <React.Fragment>
      <Col sm={6} md={3} className="card-container">
        <Link to={`pokemon/${pokemonIndex}`}>
          <Card>
            <Card.Header as="h5">
              {pokemonIndex ? `# ${pokemonIndex}` : null}
            </Card.Header>

            <Card.Body>
              {loading ? (
                <Image className="pokemonCardImage" src={Spinner} alt="hola" />
              ) : (
                <Image className="pokemonCardImage" src={imageUrl} fluid />
              )}
              <Card.Title as="h6">
                {name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (letter) =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")}
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </React.Fragment>
  );
};

export default PokemonCard;
