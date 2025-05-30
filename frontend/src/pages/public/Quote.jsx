// QuoteForm.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/Quote.css';

const QuoteForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vehicle } = location.state || {};

    // Obtener solo el nombre del modelo sin la marca
    const modelName = vehicle?.name?.replace(`${vehicle?.brandName} `, '') || 'Qashqai';

    const handleBuyClick = () => {
        // Redirigir a la página de checkout con la información del vehículo
        navigate('/checkout', {
            state: {
                items: [{
                    ...vehicle,
                    name: vehicle?.name || 'Nissan Qashqai',
                    price: vehicle?.price || '35,000 USD',
                    mainImage: vehicle?.mainImage
                }]
            }
        });
    };

    return (
        <div className="quote-container">
            <div className="quote-form">
                <div className="form-content">
                    <div className="form-field">
                        <label>Marca</label>
                        <input
                            type="text"
                            value={vehicle?.brandName || 'Nissan'}
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
                            value={vehicle?.price || '35,000 USD'}
                            disabled
                            className="disabled-input"
                        />
                    </div>

                    <button
                        type="button"
                        className="buy-button"
                        onClick={handleBuyClick}
                    >
                        Comprar
                    </button>
                </div>
            </div>

            <div className="quote-image">
                {vehicle && vehicle.mainImage ? (
                    <img src={vehicle.mainImage} alt={vehicle.name} />
                ) : (
                    // Imagen por defecto si no hay vehículo
                    <div className="default-vehicle-bg"></div>
                )}
            </div>
        </div>
    );
};

export default QuoteForm;