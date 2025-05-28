import React from "react";
import "./css/InicioSesion.css";
import image from "../pages/img/image 19.png";
import { Link } from "react-router-dom";

const InicioSesion = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Bienvenido</h1>
        <input className="input" type="text" placeholder="Correo electrónico" />
        <input className="input" type="password" placeholder="Contraseña" />
        <button className="Recuperar">Recuperar Contraseña</button>

        <Link to="/login" className="Boton">
          Iniciar Sesión
        </Link>
        <Link to="/register" className="Boton secundario">
          Registrarse
        </Link>
      </div>
      <div className="login-image">
        <img src={image} alt="Imagen de inicio de sesión" className="image" />
      </div>
    </div>
  );
};

export default InicioSesion;
