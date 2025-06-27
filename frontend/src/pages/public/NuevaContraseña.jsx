import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/NuevaContraseña.css';

const NuevaContraseña = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Validación básica
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setMessage('La contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/RrecoveryPassword/newPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();

            if (data.message === "Password updated successfully") {
                setMessage('Contraseña actualizada correctamente');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else if (data.message === "Code not verified") {
                setMessage('Sesión expirada. Inicia el proceso nuevamente');
                setTimeout(() => {
                    navigate('/recuperar-contrasena');
                }, 2000);
            } else {
                setMessage('Error al actualizar la contraseña');
            }
        } catch (error) {
            setMessage('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <br/>
        <br/>
        <div className="new-password-container">
            <div className="new-password-card">
                <div className="new-password-header">
                    <h1>Nueva Contraseña</h1>
                </div>

                <form onSubmit={handleSubmit} className="new-password-form">
                    <div className="input-group">
                        <div className="password-input-container">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nueva contraseña"
                                required
                                disabled={loading}
                                minLength={6}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                disabled={loading}
                            >
                                {showNewPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="password-input-container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirmar contraseña"
                                required
                                disabled={loading}
                                minLength={6}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                disabled={loading}
                            >
                                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
                    </button>

                    {message && (
                        <div className={`message ${message.includes('Error') || message.includes('no coinciden') || message.includes('expirada') ? 'error' : 'success'}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
        </>
    );
};

export default NuevaContraseña;