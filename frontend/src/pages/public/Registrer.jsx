import React, { useState } from "react";
import "./css/Register.css"; 

const Registrer = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validación en tiempo real para la contraseña
    if (name === 'password') {
      setPasswordValidation({
        minLength: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[@$!%*?&]/.test(value)
      });
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
  };

  return (
    <>
    
    <br/>
    <br/>
    <br/>
    <br/>
    
    <div className="register-page">
      <div className="background-overlay"></div>
      
      <div className="main-container">
        <div className="content-left">
          {/* Espacio para contenido adicional si es necesario */}
        </div>
        
        <div className="content-right">
          <div className="form-container">
            <div className="form-header">
              <h1>Registrarse</h1>
              {isLoggedIn && (
                <div className="login-status">
                  <p>¿Ya tienes cuenta?</p>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={handleLoginRedirect}
                  >
                    Iniciar Sesión
                  </button>
                </div>
              )}
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-input" 
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder=" "
                  required 
                />
                <label htmlFor="nombre" className="form-label">Nombre</label>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-input"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="apellido" className="form-label">Apellido</label>
              </div>

              <div className="input-group">
                <input 
                  type="email" 
                  className="form-input" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=" "
                  required 
                />
                <label htmlFor="email" className="form-label">Email</label>
              </div>

              <div className="input-group password-group">
                <input
                  type="password"
                  className="form-input"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="password" className="form-label">Contraseña</label>
                
                <div className="password-requirements">
                  <div className="requirement-item">
                    <span className={`requirement-icon ${passwordValidation.minLength ? 'valid' : 'invalid'}`}>
                      {passwordValidation.minLength ? '✓' : '×'}
                    </span>
                    <span className="requirement-text">Mínimo 8 caracteres</span>
                  </div>
                  <div className="requirement-item">
                    <span className={`requirement-icon ${passwordValidation.hasUppercase ? 'valid' : 'invalid'}`}>
                      {passwordValidation.hasUppercase ? '✓' : '×'}
                    </span>
                    <span className="requirement-text">Al menos una mayúscula</span>
                  </div>
                  <div className="requirement-item">
                    <span className={`requirement-icon ${passwordValidation.hasNumber ? 'valid' : 'invalid'}`}>
                      {passwordValidation.hasNumber ? '✓' : '×'}
                    </span>
                    <span className="requirement-text">Al menos un número</span>
                  </div>
                  <div className="requirement-item">
                    <span className={`requirement-icon ${passwordValidation.hasSpecialChar ? 'valid' : 'invalid'}`}>
                      {passwordValidation.hasSpecialChar ? '✓' : '×'}
                    </span>
                    <span className="requirement-text">Al menos un carácter especial (@$!%*?&)</span>
                  </div>
                </div>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  id="terms"
                  required
                />
                <label className="checkbox-label" htmlFor="terms">
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">Acepto los términos y condiciones</span>
                </label>
              </div>

              <button type="submit" className="btn-primary">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default Registrer;