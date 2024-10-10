import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function Home() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  const getJuegos = async () => {
    const response = await fetch("http://localhost:3000/api/games");
    if (!response.ok) {
      throw new Error("Error al obtener los juegos");
    }
    const data = await response.json();
    setGames(data);
  };

  useEffect(() => {
    getJuegos();
  }, []);

  const MostrarJuegos = ({ games }) => (
    <div className="games-container">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <h3>{game.title}</h3>
          <button
            onClick={() =>
              navigate(`/game/${game.id}`, { state: { id: game.id } })
            }
          >
            Detalles
          </button>
          <button>Borrar</button>
        </div>
      ))}
    </div>
  );

  // Agregar Juego
  const handleAgregarJuego = () => {};

  return (
    <div className="App">
      <header className="Application">
        <h1>Título de la aplicación</h1>
        <button onClick={handleAgregarJuego}>Agregar juego</button>
      </header>
      <MostrarJuegos games={games} />
    </div>
  );
}

export default Home;
