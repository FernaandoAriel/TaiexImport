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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras";
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
    } else if (formData.apellido.length < 2) {
      newErrors.apellido = "El apellido debe tener al menos 2 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.apellido)) {
      newErrors.apellido = "El apellido solo puede contener letras";
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del email es inválido";
    }

    // Validar password
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (!passwordValidation.minLength || !passwordValidation.hasUppercase ||
      !passwordValidation.hasNumber || !passwordValidation.hasSpecialChar) {
      newErrors.password = "La contraseña no cumple con los requisitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo que se está editando
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

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

  const resetForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    });
    setPasswordValidation({
      minLength: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecialChar: false
    });
    setErrors({});
    setMessage('');
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Preparar los datos para enviar al backend
      const dataToSend = {
        name: formData.nombre,
        lastName: formData.apellido,
        email: formData.email,
        password: formData.password
      };

      const response = await fetch("http://localhost:4000/api/RregisterCustomers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage("¡Registro exitoso! Revisa tu email para verificar tu cuenta.");
        resetForm();
        // Redirigir a la página de verificación
        setTimeout(() => {
          window.location.href = '/verificar-codigo';
        }, 2000);
      } else {
        setMessage(responseData.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error: ", error);
      setMessage("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />

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

              {/* Mostrar mensajes de estado */}
              {message && (
                <div className={`message ${message.includes('exitoso') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <form className="register-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className={`form-input ${errors.nombre ? 'error' : ''}`}
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    className={`form-input ${errors.apellido ? 'error' : ''}`}
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="apellido" className="form-label">Apellido</label>
                  {errors.apellido && <span className="error-message">{errors.apellido}</span>}
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="email" className="form-label">Email</label>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="input-group password-group">
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  {errors.password && <span className="error-message">{errors.password}</span>}

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
                    disabled={isLoading}
                  />
                  <label className="checkbox-label" htmlFor="terms">
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">Acepto los términos y condiciones</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Registrando...' : 'Registrarse'}
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