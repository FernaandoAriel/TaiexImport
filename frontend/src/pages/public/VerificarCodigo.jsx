import React, { useState, useEffect } from 'react';
import './css/VerificarCodigo.css';

const VerificarCodigo = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
    } else if (resendCooldown === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown, canResend]);

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-F0-9]/g, '').slice(0, 6);
    setVerificationCode(value);
    if (error) setError('');
    if (message) setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      setError('El código debe tener 6 caracteres');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/RregisterCustomers/verifyCodeEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          verificationCodeRequest: verificationCode
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage('¡Verificación exitosa! Redirigiendo al login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(responseData.message || 'Código incorrecto. Verifica e intenta nuevamente.');
        setVerificationCode('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/RregisterCustomersresendVerificationCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setMessage('Código reenviado exitosamente a tu correo electrónico');
        setCanResend(false);
        setResendCooldown(7200); // 2 horas en segundos
      } else {
        setError('Error al reenviar el código. Intenta más tarde.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión al reenviar código.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
    <br/>
    <br/>
    <br/>
    <div className="verify-container">
      <div className="verify-card">
        <div className="verify-header">
          <h1>Verificar Cuenta</h1>
          <p>Ingresa el código de 6 dígitos enviado a tu correo electrónico</p>
        </div>

        <form onSubmit={handleSubmit} className="verify-form">
          <div className="code-input-container">
            <input
              type="text"
              value={verificationCode}
              onChange={handleInputChange}
              placeholder="ABC123"
              maxLength="6"
              className={`code-input ${error ? 'error' : ''} ${message ? 'success' : ''}`}
              disabled={isLoading}
              autoComplete="off"
              autoFocus
            />
            <div className="code-format-hint">
              Formato: ABC123 (letras y números)
            </div>
          </div>

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          {message && (
            <div className="success-message">
              ✅ {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || verificationCode.length !== 6}
            className="verify-button"
          >
            {isLoading ? 'Verificando...' : 'Verificar Código'}
          </button>
        </form>

        <div className="back-link">
          <a href="/register">← Volver al registro</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default VerificarCodigo;