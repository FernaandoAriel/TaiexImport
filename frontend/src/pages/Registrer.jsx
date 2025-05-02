import React from "react";
import "./css/Register.css"; 

const Registrer = () => {
  return (
    <div className="register-page">
      <div className="container">
        <h1 className="text-center">Registrarse</h1>
        <form className="register-form">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input 
              type="text" 
              className="form-control" 
              id="nombre" 
              placeholder="Ingresa tu nombre"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              placeholder="Ingresa tu apellido"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="ejemplo@correo.com"
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresa tu contraseña"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial"
              required
            />
            <div className="password-requirements">
              <small className="form-text">
                La contraseña debe contener:
                <ul>
                  <li>Mínimo 8 caracteres</li>
                  <li>Al menos una mayúscula</li>
                  <li>Al menos un número</li>
                  <li>Al menos un carácter especial</li>
                </ul>
              </small>
            </div>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              required
            />
            <label className="form-check-label" htmlFor="terms">
              Acepto los términos y condiciones
            </label>
          </div>
          <button type="submit" className="btn-primary">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registrer;
