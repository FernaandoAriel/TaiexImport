import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/VerificarCodigoRecu.css';

const VerificarCodigoRecu = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:4000/api/RrecoveryPassword/verifyCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (data.message === "Code verified successfully") {
                setMessage('Código verificado correctamente');
                setTimeout(() => {
                    navigate('/nueva-contrasena');
                }, 1500);
            } else if (data.message === "Invalid code") {
                setMessage('Código incorrecto');
            } else {
                setMessage('Error al verificar el código');
            }
        } catch (error) {
            setMessage('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const handleCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Solo números
        if (value.length <= 5) {
            setCode(value);
        }
    };

    return (
        <div className="verify-container">
            <div className="verify-card">
                <div className="verify-header">
                    <h1>Verificar Código</h1>
                    <p>Ingresa el código de 5 dígitos enviado a tu correo</p>
                </div>

                <form onSubmit={handleSubmit} className="verify-form">
                    <div className="input-group">
                        <input
                            type="text"
                            value={code}
                            onChange={handleCodeChange}
                            placeholder="12345"
                            required
                            disabled={loading}
                            maxLength={5}
                            className="code-input"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading || code.length !== 5}
                    >
                        {loading ? 'Verificando...' : 'Verificar Código'}
                    </button>

                    {message && (
                        <div className={`message ${message.includes('Error') || message.includes('incorrecto') ? 'error' : 'success'}`}>
                            {message}
                        </div>
                    )}
                </form>

                <div className="back-option">
                    <button 
                        onClick={() => navigate('/login')}
                        className="back-btn"
                        disabled={loading}
                    >
                        Volver a solicitar código
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificarCodigoRecu;