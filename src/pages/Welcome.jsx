import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"

const Welcome = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  const handleAccept = () => {
    setShowWelcome(false);
    navigate("/home");
  };

  if (!showWelcome) return null;

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Bienvenido a la Aplicación CRUD</h2>
        <p className="description">¡Gracias por visitar nuestra aplicación CRUD!</p>
        <button className="button" onClick={handleAccept}>Aceptar</button>
      </div>
    </div>
  );
};

export default Welcome;
