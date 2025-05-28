import React, { useState } from "react";
import "./css/InicioSesion.css";
import image from "../pages/img/image 19.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Asegúrate de que la capitalización sea correcta: AuthContext

// Importaciones para React-Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Estilos CSS para React-Toastify

const InicioSesion = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // No necesitamos un estado 'error' aquí, ya que Toastify lo manejará

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login(email, password);

      if (result.success) {
        // Muestra un toast de éxito
        toast.success("¡Usuario logeado con éxito!", {
          position: "top-right",
          autoClose: 3000, // Cierra automáticamente después de 3 segundos
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("Inicio de sesión exitoso:", result.message);

        // Retrasa la navegación ligeramente para que el toast sea visible
        setTimeout(() => {
          navigate("/dashboard"); // Cambia '/dashboard' por la ruta a la que quieres redirigir
        }, 1000); // Espera 1 segundo antes de navegar

      } else {
        // Muestra un toast de error si las credenciales son incorrectas o el usuario no se encuentra
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
        console.error("Error al iniciar sesión:", errorMessage);
      }
    } catch (err) {
      // Muestra un toast para errores de red o errores inesperados
      toast.error("Ocurrió un error inesperado. Intenta de nuevo más tarde.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error en handleLogin:", err);
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

      {/* Componente ToastContainer para mostrar los toasts */}
      <ToastContainer />
    </div>
  );
};

export default InicioSesion;
