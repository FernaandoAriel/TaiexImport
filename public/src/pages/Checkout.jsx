// Checkout.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './css/Checkout.css';
import VisaLogo from './img/visa.png';
import PaypalLogo from './img/paypal.png';
import MasterCardLogo from './img/mastercard.png';
import AmexLogo from './img/amex.png';

const Checkout = () => {
    const location = useLocation();
    const { items } = location.state || { items: [] };

    const [contactInfo, setContactInfo] = useState({
        email: '',
        name: '',
        lastName: '',
        address: '',
    });

    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    // Calcular subtotal
    const subtotal = items.reduce((total, item) => total + parseFloat(item.price.replace(/[^\d.]/g, '')), 0);
    const warehouseFee = selectedWarehouse ? selectedWarehouse.fee : 0;
    const total = subtotal + warehouseFee;

    // Opciones de bodegas
    const warehouses = [
        { id: 1, name: 'AutoHaus Central', location: 'Centro, Área 2013', fee: 7.99 },
        { id: 2, name: 'Elite Motors Storage', location: 'Sábado, Área 5', fee: 6.99 },
        { id: 3, name: 'Global Auto Hub', location: 'Carretera Oeste', fee: 5.50 },
        { id: 4, name: 'Green Auto Depot', location: 'Norte, Sector 12', fee: 4.75 },
    ];

    const handleInputChange = (e) => {
        setContactInfo({
            ...contactInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Procesar pago (en una aplicación real, este sería un proceso más complejo)
        alert('¡Pago procesado con éxito!');
    };

    return (
        <div className="checkout-container">
            <div className="checkout-form">
                <div className="payment-options">
                    <img src={VisaLogo} alt="Visa" className="payment-logo" />
                    <img src={PaypalLogo} alt="PayPal" className="payment-logo" />
                </div>

                <form onSubmit={handleSubmit}>
                    <section className="checkout-section">
                        <h2>Contácto</h2>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={contactInfo.email}
                            onChange={handleInputChange}
                            required
                        />
                    </section>

                    <section className="checkout-section">
                        <h2>Entrega</h2>
                        <input
                            type="text"
                            name="region"
                            placeholder="País/Región"
                            required
                        />
                        <div className="name-fields">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                value={contactInfo.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Apellido"
                                value={contactInfo.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="address"
                            placeholder="Dirección"
                            value={contactInfo.address}
                            onChange={handleInputChange}
                            required
                        />

                        <div className="warehouse-selection">
                            <p>Elige tu bodega de entrega:</p>
                            {warehouses.map(warehouse => (
                                <label key={warehouse.id} className="warehouse-option">
                                    <input
                                        type="radio"
                                        name="warehouse"
                                        checked={selectedWarehouse && selectedWarehouse.id === warehouse.id}
                                        onChange={() => setSelectedWarehouse(warehouse)}
                                    />
                                    <div className="warehouse-info">
                                        <div>
                                            <strong>{warehouse.name}</strong>
                                            <p>{warehouse.location}</p>
                                        </div>
                                        <span className="warehouse-fee">${warehouse.fee.toFixed(2)}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </section>

                    <section className="checkout-section">
                        <h2>Pago</h2>
                        <p className="payment-subtitle">Realiza tu compra de manera segura y rápida.</p>

                        <label className="payment-method">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === 'credit'}
                                onChange={() => setPaymentMethod('credit')}
                            />
                            <span>Tarjeta de crédito</span>
                            <div className="card-logos">
                                <img src={VisaLogo} alt="Visa" className="card-logo" />
                                <img src={MasterCardLogo} alt="MasterCard" className="card-logo" />
                                <img src={AmexLogo} alt="American Express" className="card-logo" />
                            </div>
                        </label>

                        <label className="payment-method">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === 'paypal'}
                                onChange={() => setPaymentMethod('paypal')}
                            />
                            <span>Paypal</span>
                            <img src={PaypalLogo} alt="PayPal" className="paypal-logo" />
                        </label>

                        <button
                            type="submit"
                            className="pay-button"
                            disabled={!selectedWarehouse || !paymentMethod}
                        >
                            Pagar ahora
                        </button>
                    </section>
                </form>
            </div>

            <div className="order-summary">
                {items.map((item, index) => (
                    <div key={index} className="order-item">
                        <div className="item-image-container">
                            <img src={item.mainImage} alt={item.name} className="item-image" />
                        </div>
                        <div className="item-details">
                            <p className="item-name">{item.name}</p>
                            <p className="item-price">${parseFloat(item.price.replace(/[^\d.]/g, '')).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                        </div>
                    </div>
                ))}

                <div className="order-totals">
                    <div className="total-line">
                        <span>Subtotal</span>
                        <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="total-line">
                        <span>Bodega</span>
                        <span>${warehouseFee.toFixed(2)}</span>
                    </div>
                    <div className="total-line final-total">
                        <span>Total</span>
                        <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;