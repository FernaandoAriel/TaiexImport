import React, { useState } from "react";
import "./css/InicioSesion.css";
import image from "./img/image 19.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InicioSesion = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const result = await login(email, password);
      console.log("Login result:", result); // Agrega esto para depuración
  
      if (result.success) {
        toast.success("¡Usuario logeado con éxito!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        // Redirigir inmediatamente (sin setTimeout)
        if (result.userType === 'admin' || result.userType === 'employee') {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        const errorMessage = result.message || "Error al iniciar sesión. Verifica tus credenciales.";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Ocurrió un error inesperado. Intenta de nuevo más tarde.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Bienvenido</h1>

        <input
          className="input"
          type="text"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="Recuperar">Recuperar Contraseña</button>

        <button className="Boton" onClick={handleLogin}>
          Iniciar Sesión
        </button>
        <Link to="/register" className="Boton secundario">
          Registrarse
        </Link>
      </div>
      <div className="login-image">
        <img src={image} alt="Imagen de inicio de sesión" className="image" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default InicioSesion;