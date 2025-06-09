import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

const NUM_LIGHTS = 15;
const NUM_SHAPES = 8;

const randomPosition = () => Math.random() * 100 + "%";

const Welcome = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  // luces y figuraaaaaas
  const lightsPositions = useMemo(() =>
    Array.from({ length: NUM_LIGHTS }, () => ({
      top: randomPosition(),
      left: randomPosition(),
      size: 8 + Math.random() * 12,
      duration: 8 + Math.random() * 7,
      delay: Math.random() * 5,
    })), []
  );

  const shapes = useMemo(() =>
    Array.from({ length: NUM_SHAPES }, () => ({
      top: randomPosition(),
      left: randomPosition(),
      size: 40 + Math.random() * 60,
      duration: 20 + Math.random() * 15,
      delay: Math.random() * 10,
      type: Math.random() > 0.5 ? "circle" : "triangle",
      direction: Math.random() > 0.5 ? "normal" : "reverse",
    })), []
  );

  const handleAccept = () => {
    setShowWelcome(false);
    navigate("/home");
  };

  if (!showWelcome) return null;

  return (
    <div className="welcome-container">
      <div className="lights-background">
        {lightsPositions.map((light, i) => (
          <div
            key={`light-${i}`}
            className="light"
            style={{
              top: light.top,
              left: light.left,
              width: light.size + "px",
              height: light.size + "px",
              animationDuration: light.duration + "s",
              animationDelay: light.delay + "s",
            }}
          />
        ))}

        {shapes.map((shape, i) => (
          <div
            key={`shape-${i}`}
            className={`shape ${shape.type}`}
            style={{
              top: shape.top,
              left: shape.left,
              width: shape.size + "px",
              height: shape.size + "px",
              animationDuration: shape.duration + "s",
              animationDelay: shape.delay + "s",
              animationDirection: shape.direction,
            }}
          />
        ))}
      </div>

      <div className="welcome-content">
        <h1 className="soft-title">Bienvenido a Cursos Digitales</h1>
        
        <button className="glow-button" onClick={handleAccept}>
          Comenzar
        </button>
      </div>
    </div>
  );
};

export default Welcome;
