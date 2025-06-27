import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaCarAlt, FaTools } from "react-icons/fa";

export default function HeroSection({ backgroundImage }) {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/sobrenosotros');
  };

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content">
        <h1>Taiex Import</h1>
        <p>Encuentra tu coche ideal a los precios que necesites para tus preferencias</p>
        <button className="cta-button" onClick={handleContactClick}>
          Conoce más
        </button>
      </div>
    </section>
  );
}