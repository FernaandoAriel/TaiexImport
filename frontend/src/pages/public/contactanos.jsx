import React from 'react';
import './css/contactanos.css';

const Contactanos = () => {
  return (
   <div className="contactanos-container">
    <div className="contact-form-container">
      <h2 className="form-title">Ingresa tus datos</h2>
      <form>
        <input
          type="text"
          className="form-input"
          placeholder="Nombre"
        />
        <input
          type="text"
          className="form-input"
          placeholder="Apellido"
        />
        <input
          type="email"
          className="form-input"
          placeholder="Email"
        />
        <textarea
          className="form-input"
          placeholder="Comentario"
        ></textarea>
        <button type="submit" className="form-button">
          Enviar ahora
        </button>
      </form>
    </div>
    </div>
  );
};

export default Contactanos;