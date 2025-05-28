import React from "react";
import { FaMoneyBillWave, FaCarAlt, FaTools } from "react-icons/fa";

export default function HeroSection({ backgroundImage }) {
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
        <h1>Cotiza</h1>
        <p>Encuentra tu coche ideal</p>
        <button className="cta-button">Conoce más</button>
      </div>
    </section>
  );
}