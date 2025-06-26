import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './css/Quote.css';

const QuoteForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vehicle } = location.state || {};

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

                    <Link
                        to="/checkout"
                        state={{
                            items: [{
                                ...vehicle,
                                name: vehicle?.name,
                                price: vehicle?.price,
                                mainImage: vehicle?.mainImage
                            }]
                        }}
                        className="buy-button"
                    >
                        Comprar
                    </Link>
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