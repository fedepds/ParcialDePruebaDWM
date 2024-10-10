import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function Home() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");
  const [newGamePlayers, setNewGamePlayers] = useState(0);
  const [newGameCategories, setNewGameCategories] = useState("");
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
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
  // Agregar Juego con POST al servidor
  const handleAgregarJuego = async (e) => {
    e.preventDefault(); // Prevenir que la página se recargue
    if (newGame.trim() !== "") {
      try {
        const response = await fetch("http://localhost:3000/api/games", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newGame,
            description: newGameDescription,
            players: newGamePlayers,
            categories: newGameCategories,
          }),
        });

        if (!response.ok) {
          throw new Error("Error al agregar el juego");
        }

        const updatedGames = await response.json(); // El servidor devuelve el arreglo de juegos actualizado
        setGames(updatedGames); // Actualizar el estado con la lista de juegos retornada por el servidor
        setNewGame(""); // Lo limpio para estar vacio para volver a usarlo
        setNewGameCategories("");
        setNewGamePlayers(0);
        setNewGameDescription("");
        setShowForm(false); // Ocultar el formulario después de agregar el juego
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="App">
      <header className="Application">
        <h1>Título de la aplicación</h1>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancelar" : "Agregar juego"}{" "}
        </button>
      </header>

      {showForm && (
        <form onSubmit={handleAgregarJuego}>
          <input
            type="text"
            value={newGame}
            onChange={(e) => setNewGame(e.target.value)}
            placeholder="Título del nuevo juego"
          />
          <input
            type="text"
            value={newGameDescription}
            onChange={(e) => setNewGameDescription(e.target.value)}
            placeholder="Descripción del nuevo juego"
          />
          <input
            type="number"
            value={newGamePlayers}
            onChange={(e) => setNewGamePlayers(e.target.value)}
            placeholder="Num de jugadores"
          />
          <input
            type="text"
            value={newGameCategories}
            onChange={(e) => setNewGameCategories(e.target.value)}
            placeholder="Categoria"
          />
          <button type="submit">Guardar juego</button>
        </form>
      )}

      <MostrarJuegos games={games} />
    </div>
  );
}

export default Home;
