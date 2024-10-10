import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
function Detalles() {
  const [datos, setDatos] = useState([]);

  const { state } = useLocation();

  const getDatos = async () => {
    const response = await fetch(`http://localhost:3000/api/games/${state.id}`);
    if (!response.ok) {
      throw new Error("Error al obtener los juegos");
    }
    console.log({ response });
    const data = await response.json();

    setDatos(data);
  };
  useEffect(() => {
    getDatos();
  }, []);

  console.log(datos);
  const MostrarDatos = ({ datos }) => {
    return (
      <div className="conteneder">
        {datos.map((dato) => (
          <div key={dato.id}>
            <h3>{dato.title}</h3>
            <p>{dato.description}</p>
            <p>{dato.players}</p>
            <p>{dato.categories}</p>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <MostrarDatos datos={datos}></MostrarDatos>
    </div>
  );
}

export default Detalles;
