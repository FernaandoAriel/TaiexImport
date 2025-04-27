// Home.jsx
import React from "react";
import "./css/home.css";
import CarroGris from "../pages/img/CarroGrisHome.jpg";
import CarroAzul from "../pages/img/CarroAzulHome.jpg";
import NissanLogo from "../pages/img/Nissan.png";
import HondaLogo from "../pages/img/Honda.png";
import ToyotaLogo from "../pages/img/Toyota.png";
import LexusLogo from "../pages/img/Lexus.png";
import MitsubishiLogo from "../pages/img/mitsubishi.png";
import QashqaiImg from "../pages/img/qashqai.png";
import PathfinderImg from "../pages/img/pathfinder.png";
import CivicTypeRImg from "../pages/img/civic-type-r.png";

// Importa los iconos (puedes usar react-icons o imágenes propias)
import { FaMoneyBillWave, FaCarAlt, FaTools } from "react-icons/fa";

export default function Home() {
  return (
    <div className="home-container">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      ></meta>
      {/* Hero Section con el carro gris */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${CarroGris})`,
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

      {/* Marcas Section */}
      <section className="brands-section">
        <div className="brand-logos">
          <img src={NissanLogo} alt="Nissan" />
          <img src={HondaLogo} alt="Honda" />
          <img src={ToyotaLogo} alt="Toyota" />
          <img src={LexusLogo} alt="Lexus" />
          <img src={MitsubishiLogo} alt="Mitsubishi" />
        </div>
      </section>

      {/* Servicios Section */}
      <section className="services-section">
        <div className="service-item">
          <div className="service-icon">
            <FaMoneyBillWave />
          </div>
          <h3>Escoge tu precio</h3>
        </div>
        <div className="service-item">
          <div className="service-icon">
            <FaCarAlt />
          </div>
          <h3>Datos Vehículo Preferido</h3>
        </div>
        <div className="service-item">
          <div className="service-icon">
            <FaTools />
          </div>
          <h3>Diseña tu marca favorita</h3>
        </div>
      </section>

      {/* Promoción con el carro azul */}
      <section className="promo-section">
        <div className="promo-image">
          <img src={CarroAzul} alt="Honda Civic 2024" />
        </div>
        <div className="promo-content">
          <h3>Descubre el Honda Civic 2024</h3>
          <p>
            El coche más innovador con prestaciones de primer nivel y
            características de alto rendimiento.
          </p>
        </div>
      </section>

      {/* Vehículos más cotizados */}
      <section className="featured-vehicles">
        <h2>NUESTROS VEHÍCULOS MÁS COTIZADOS</h2>
        <div className="vehicle-list">
          <div className="vehicle-item">
            <img src={QashqaiImg} alt="Qashqai" className="CarroFeatured" />
            <h4>QASHQAI</h4>
            <p>Sunroof | Cuatro puertas</p>
            <button className="vehicle-button">Conoce más →</button>
          </div>
          <div className="vehicle-item">
            <img
              src={PathfinderImg}
              alt="Pathfinder"
              className="CarroFeatured"
            />
            <h4>PATHFINDER</h4>
            <p>Elegante | Robusto | Confortable</p>
            <button className="vehicle-button">Conoce más →</button>
          </div>
          <div className="vehicle-item">
            <img
              src={CivicTypeRImg}
              alt="Civic Type R 2024"
              className="CarroFeatured"
            />
            <h4>Civic Type R 2024</h4>
            <p>Elegante | Rápido | Deportivo</p>
            <button className="vehicle-button">Conoce más →</button>
          </div>
        </div>
      </section>
    </div>
  );
}
