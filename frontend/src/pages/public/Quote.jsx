import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './css/Quote.css';
import { useCart } from './cartContex.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-hot-toast';

const QuoteForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vehicle } = location.state || {};
    const { addToCart, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();

    // Si no hay datos del vehículo, muestra mensaje o redirige
    if (!vehicle) {
        return (
            <div style={{ padding: 40, textAlign: 'center' }}>
                <h2>No hay información para cotizar.</h2>
                <button onClick={() => navigate('/')}>Volver al inicio</button>
            </div>
        );
    }

    // Obtener solo el nombre del modelo sin la marca
    const modelName = vehicle?.name?.replace(`${vehicle?.brandName} `, '') || '';

    const handleBuy = async () => {
        if (!isAuthenticated() || !user?._id) {
            toast.error('Debes iniciar sesión para comprar.');
            navigate('/login');
            return;
        }
        await clearCart();
        await addToCart({ ...vehicle, customerId: user._id });
        toast.success('¡Listo para comprar!');
        navigate('/checkout');
    };

    return (
        <div className="quote-container">
            <div className="quote-form">
                <div className="form-content">
                    <div className="form-field">
                        <label>Marca</label>
                        <input
                            type="text"
                            value={vehicle?.brandName || ''}
                            disabled
                            className="disabled-input"
                        />
                    </div>

                    <div className="form-field">
                        <label>Modelo</label>
                        <input
                            type="text"
                            value={modelName}
                            disabled
                            className="disabled-input"
                        />
                    </div>

                    <div className="form-field">
                        <label>Precio</label>
                        <input
                            type="text"
                            value={vehicle?.price || ''}
                            disabled
                            className="disabled-input"
                        />
                    </div>

                    <button
                        className="buy-button"
                        onClick={handleBuy}
                        style={{ width: '100%', marginTop: '2rem', fontWeight: 700, fontSize: '1.1rem', background: '#0078d4' }}
                    >
                        Proceder a pago
                    </button>
                </div>
            </div>

            <div className="quote-image">
                {vehicle && vehicle.mainImage ? (
                    <img src={vehicle.mainImage} alt={vehicle.name} />
                ) : (
                    <div className="default-vehicle-bg"></div>
                )}
            </div>
        </div>
    );
};

export default QuoteForm;