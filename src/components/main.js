import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./main.scss";

export default function MainPage() {
  const [argonautesName, setArgonautesName] = useState([]);
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/argonautes`, { name: name })
      .then(() => {
        setName("");
        window.location.reload();
      })
      .catch(console.error);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/argonautes`)
      .then((response) => {
        setArgonautesName(response.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="main_page">
      <header>
        <img
          src="http://association-lesargonautes.fr/wp-content/uploads/2017/11/LOGO_ARGONAUTES_2016_OR-271x300.jpg"
          alt="Logo Argonautes"
          className="logo_argonautes"
        />
        <h1 className="main_title">Les Argonautes</h1>
      </header>
      <main>
        <h2>Ajouter un(e) Argonaute</h2>
        <form className="new-member-form">
          <TextField
            id="name"
            variant="outlined"
            value={name}
            size="small"
            style={{ backgroundColor: "white" }}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="button">
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              style={{ backgroundColor: "white" }}
            >
              Envoyer
            </Button>
          </div>
        </form>
        <h2>Membres de l'équipage</h2>
        <div className="argonautes_liste">
          {argonautesName &&
            argonautesName.map((argonautes) => {
              return <p className="name">{argonautes.name}</p>;
            })}
        </div>
      </main>

      <footer>
        <a href="https://github.com/BrieucQ">
          <p>Lien GitHub</p>
        </a>
        <a href="https://fr.wikipedia.org/wiki/Argonautes">
          <p>Notre histoire</p>
        </a>
        <a href="https://www.linkedin.com/in/brieuc-quertier/">
          <p>Lien Linkedin</p>
        </a>
      </footer>
    </div>
  );
}
