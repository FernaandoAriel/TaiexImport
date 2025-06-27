import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/RecuperarContraseña.css';

const RecuperarContraseña = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:4000/api/RrecoveryPassword/requestCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.message === "Verification code sent") {
                setMessage('Código enviado correctamente');
                setTimeout(() => {
                    navigate('/verificar-codigorecu');
                }, 1500);
            } else if (data.message === "User not found") {
                setMessage('Email no encontrado');
            } else {
                setMessage('Error al enviar el código');
            }
        } catch (error) {
            setMessage('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recovery-container">
            <div className="recovery-card">
                <div className="recovery-header">
                    <h1>Recuperar Contraseña</h1>
                    <p>Ingresa tu email para recibir el código de verificación</p>
                </div>

                <form onSubmit={handleSubmit} className="recovery-form">
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Correo electrónico"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Enviar Código'}
                    </button>

                    {message && (
                        <div className={`message ${message.includes('Error') || message.includes('no encontrado') ? 'error' : 'success'}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RecuperarContraseña;