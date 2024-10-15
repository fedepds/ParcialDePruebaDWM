import { useLocation } from "react-router-dom";
import './detalles.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
function Detalles() {
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();



  const getDatos = async () => {
    const response = await fetch(`http://localhost:3000/api/games/${id}`);
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
  const MostrarDatos = ( ) => {
    return (
      <div className="contenedor">
        {datos.map((dato) => (
   
          <div key={dato.id}>
          <button onClick={()=>{
           navigate(`/home`);
          }}>Atras</button>
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
