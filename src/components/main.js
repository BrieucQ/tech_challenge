import React, { useEffect, useState } from "react";
import axios from "axios";
import "./main.scss";

export default function MainPage() {
  const [argonautesName, setArgonautesName] = useState([]);
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/argonautes`, { name: name })
      .then((response) => {
        console.log(response.data);
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
    <div className="page">
      <header>
        <h1>
          <img
            src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
            alt="Wild Code School logo"
          />
          Les Argonautes
        </h1>
      </header>
      <main className="main-part">
        <h2>Ajouter un(e) Argonaute</h2>
        <form className="new-member-form">
          <label>Nom de l&apos;Argonaute</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="button">
            <button type="submit" onClick={handleSubmit}>
              Envoyer
            </button>
          </div>
        </form>
        <h2>Membres de l'équipage</h2>
        <table>
          {argonautesName &&
            argonautesName.map((argonautes) => {
              return (
                <tr>
                  <td>{argonautes.name}</td>
                </tr>
              );
            })}
        </table>
      </main>

      <div className="footer">
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
      </div>
    </div>
  );
}
