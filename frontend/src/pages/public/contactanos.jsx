import React, { useState } from 'react';
import './css/contactanos.css';

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    comentario: ''
  });
  
  const [errors, setErrors] = useState({});
  const [toasts, setToasts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para mostrar toast
  const showToast = (message, type) => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  // Validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar campo individual
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'nombre':
        if (!value.trim()) error = 'El nombre es requerido';
        else if (value.trim().length < 2) error = 'El nombre debe tener al menos 2 caracteres';
        break;
      case 'apellido':
        if (!value.trim()) error = 'El apellido es requerido';
        else if (value.trim().length < 2) error = 'El apellido debe tener al menos 2 caracteres';
        break;
      case 'email':
        if (!value.trim()) error = 'El email es requerido';
        else if (!validateEmail(value)) error = 'Por favor ingresa un email válido';
        break;
      case 'comentario':
        if (!value.trim()) error = 'El comentario es requerido';
        else if (value.trim().length < 10) error = 'El comentario debe tener al menos 10 caracteres';
        break;
      default:
        break;
    }
    
    return error;
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validar en tiempo real y limpiar errores
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    
    // Mostrar toast de validación si el campo es válido después de tener error
    if (errors[name] && !error) {
      showToast('Campo válido ✓', 'success');
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validar todos los campos
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      showToast('Por favor corrige los errores en el formulario', 'error');
      setIsSubmitting(false);
      return;
    }
    
    // Enviar al backend
    try {
      const response = await fetch('http://localhost:4000/api/RcontactForm/sendContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          comentario: formData.comentario
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        showToast('¡Mensaje enviado exitosamente!', 'success');
        setFormData({ nombre: '', apellido: '', email: '', comentario: '' });
      } else {
        showToast(responseData.message || 'Error al enviar el mensaje', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('Error de conexión. Inténtalo de nuevo.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="contactanos-container">
        <div className="contact-form-container">
          <h2 className="form-title">Ingresa tus datos</h2>
          
          <form onSubmit={handleSubmit}>
            <p> Nombre </p>

            <div className="form-group">
              <label htmlFor="nombre" className="form-label">Nombre </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className={`form-input ${errors.nombre ? 'error' : formData.nombre && !errors.nombre ? 'success' : ''}`}
                placeholder="Ingresa tu nombre"
              />
              <div className={`error-message ${errors.nombre ? 'show' : ''}`}>
                {errors.nombre}
              </div>
            </div>
            
            <p> Apellido </p>

            <div className="form-group">
              <label htmlFor="apellido" className="form-label">Apellido *</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                className={`form-input ${errors.apellido ? 'error' : formData.apellido && !errors.apellido ? 'success' : ''}`}
                placeholder="Ingresa tu apellido"
              />
              <div className={`error-message ${errors.apellido ? 'show' : ''}`}>
                {errors.apellido}
              </div>
            </div>
            
           <p> Correo Electronico </p> 

            <div className="form-group">
              <label htmlFor="email" className="form-label">Correo Electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : formData.email && !errors.email ? 'success' : ''}`}
                placeholder="ejemplo@correo.com"
              />
              <div className={`error-message ${errors.email ? 'show' : ''}`}>
                {errors.email}
              </div>
            </div>

            <p> Comentario </p>
            
            <div className="form-group">
              <label htmlFor="comentario" className="form-label">Comentario *</label>
              <textarea
                id="comentario"
                name="comentario"
                value={formData.comentario}
                onChange={handleInputChange}
                className={`form-input form-textarea ${errors.comentario ? 'error' : formData.comentario && !errors.comentario ? 'success' : ''}`}
                placeholder="Escribe tu mensaje aquí..."
              />
              <div className={`error-message ${errors.comentario ? 'show' : ''}`}>
                {errors.comentario}
              </div>
            </div>
            
            <button 
              type="submit" 
              className="form-button"
              disabled={isSubmitting}
            >
              {isSubmitting && <span className="loading-spinner"></span>}
              {isSubmitting ? 'Enviando...' : 'Enviar ahora'}
            </button>
          </form>
        </div>
        
        {/* Toast Container */}
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={`toast ${toast.type}`}>
              {toast.message}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Contactanos;