// Checkout.jsx
import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './css/Checkout.css';
import VisaLogo from './img/visa.png';
import PaypalLogo from './img/paypal.png';
import MasterCardLogo from './img/mastercard.png';
import AmexLogo from './img/amex.png';
import { useCart } from './cartContex.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-hot-toast';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const Checkout = () => {
    const location = useLocation();
    const { cart, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated() || !user?._id) {
        return <div style={{padding: '2rem', color: '#ef4444', fontWeight: 700}}>Debes iniciar sesión para ver tu carrito y comprar.</div>;
    }
    const userCart = cart.filter(item => item.customerId === user._id);
    const [showSuccess, setShowSuccess] = useState(false);
    if (userCart.length === 0 && !showSuccess) {
        return <div style={{padding: '2rem', color: '#888', fontWeight: 600}}>Tu carrito está vacío.</div>;
    }

    const [contactInfo, setContactInfo] = useState({
        email: "",
        name: "",
        lastName: "",
        address: "",
        region: ""
    });

    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [step, setStep] = useState(1);

    const [cardInfo, setCardInfo] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: ""
    });

    const transitionRef = useRef(null);

    const [purchasedItems, setPurchasedItems] = useState([]);

    // Calcular subtotal
    const subtotal = userCart.reduce((total, item) => total + Number(item.price), 0);
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

    const handleCardInput = (e) => {
        setCardInfo({
            ...cardInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleNext = (e) => {
        e && e.preventDefault();
        if (step === 1) {
            if (!contactInfo.email || !contactInfo.name || !contactInfo.lastName || !contactInfo.address || !selectedWarehouse) {
                toast.error('Completa todos los campos de dirección y selecciona una bodega.');
                return;
            }
            setStep(2);
        } else if (step === 2) {
            if (!paymentMethod) {
                toast.error('Selecciona un método de pago.');
                return;
            }
            if (paymentMethod === 'credit') {
                if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv) {
                    toast.error('Completa todos los datos de la tarjeta.');
                    return;
                }
            }
            setStep(3);
        }
    };

    const handleBack = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('¡Pago procesado con éxito!');
        setPurchasedItems(userCart);
        clearCart();
        setShowSuccess(true);
    };

    return (
        <div className="checkout-container">
            <div className="checkout-form">
                {/* Stepper visual */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ fontWeight: step === 1 ? 700 : 400, color: step === 1 ? '#0078d4' : '#888' }}>1. Dirección</div>
                    <div style={{ fontWeight: step === 2 ? 700 : 400, color: step === 2 ? '#0078d4' : '#888' }}>2. Pago</div>
                    <div style={{ fontWeight: step === 3 ? 700 : 400, color: step === 3 ? '#0078d4' : '#888' }}>3. Confirmar</div>
                </div>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={showSuccess ? 'success' : step}
                        timeout={400}
                        classNames="fade"
                        nodeRef={transitionRef}
                    >
                        <div ref={transitionRef}>
                            {showSuccess ? (
                                <div className="checkout-success">
                                    <div className="success-animation">
                                        <svg width="80" height="80" viewBox="0 0 80 80">
                                            <circle cx="40" cy="40" r="38" stroke="#22c55e" strokeWidth="4" fill="none" />
                                            <path d="M24 42l14 14 18-26" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h2>¡Pago realizado con éxito!</h2>
                                    <p>Tu compra ha sido procesada. Pronto recibirás un correo con los detalles.</p>
                                    <div className="success-summary" style={{margin: '2rem 0', width: '100%', maxWidth: 400, background: '#f8fafc', borderRadius: 8, padding: '1.5rem', boxShadow: '0 2px 8px #0001'}}>
                                        <h4 style={{marginBottom: '1rem', color: '#22c55e'}}>Resumen de tu compra</h4>
                                        {purchasedItems.map((item, idx) => (
                                            <div key={idx} style={{display: 'flex', alignItems: 'center', marginBottom: 12}}>
                                                <img src={item.mainImage} alt={item.name} style={{width: 48, height: 36, objectFit: 'cover', borderRadius: 4, marginRight: 12, border: '1px solid #eee'}} />
                                                <div style={{flex: 1}}>
                                                    <div style={{fontWeight: 600}}>{item.name}</div>
                                                    <div style={{fontSize: 13, color: '#666'}}>${Number(item.price).toLocaleString()}</div>
                                                </div>
                                            </div>
                                        ))}
                                        <div style={{margin: '1rem 0', fontSize: 14}}>
                                            <div><b>Dirección:</b> {contactInfo.address}, {contactInfo.region}</div>
                                            <div><b>Entrega:</b> {selectedWarehouse?.name} - {selectedWarehouse?.location}</div>
                                            <div><b>Método de pago:</b> {paymentMethod === 'credit' ? `Tarjeta ****${cardInfo.number.slice(-4)}` : 'PayPal'}</div>
                                        </div>
                                        <div style={{fontWeight: 700, fontSize: 18, color: '#22c55e', marginTop: 8}}>
                                            Total: ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                    <button className="pay-button" onClick={() => window.location.href = '/'}>Volver al inicio</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    {step === 1 && (
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
                                            <h2>Entrega</h2>
                                            <input
                                                type="text"
                                                name="region"
                                                placeholder="País/Región"
                                                value={contactInfo.region}
                                                onChange={handleInputChange}
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
                                                            value={warehouse.id}
                                                            checked={String(selectedWarehouse?.id) === String(warehouse.id)}
                                                            onChange={e => {
                                                                const found = warehouses.find(w => String(w.id) === e.target.value);
                                                                setSelectedWarehouse(found || null);
                                                            }}
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
                                            <button type="button" className="pay-button" onClick={handleNext} style={{marginTop: '1.5rem'}}>Siguiente</button>
                                        </section>
                                    )}
                                    {step === 2 && (
                                        <section className="checkout-section">
                                            <h2>Pago</h2>
                                            <p className="payment-subtitle">Realiza tu compra de manera segura y rápida.</p>
                                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                                <div
                                                    className={`payment-card ${paymentMethod === 'credit' ? 'selected' : ''}`}
                                                    style={{
                                                        border: paymentMethod === 'credit' ? '2px solid #0078d4' : '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        padding: '1rem',
                                                        flex: 1,
                                                        cursor: 'pointer',
                                                        background: paymentMethod === 'credit' ? '#f0f8ff' : '#fff',
                                                        boxShadow: paymentMethod === 'credit' ? '0 2px 8px #0078d422' : 'none'
                                                    }}
                                                    onClick={() => setPaymentMethod('credit')}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <img src={VisaLogo} alt="Visa" className="card-logo" />
                                                        <img src={MasterCardLogo} alt="MasterCard" className="card-logo" />
                                                        <img src={AmexLogo} alt="American Express" className="card-logo" />
                                                    </div>
                                                    <div style={{ fontWeight: 600, marginTop: '0.5rem' }}>Tarjeta de crédito</div>
                                                </div>
                                                <div
                                                    className={`payment-card ${paymentMethod === 'paypal' ? 'selected' : ''}`}
                                                    style={{
                                                        border: paymentMethod === 'paypal' ? '2px solid #0078d4' : '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        padding: '1rem',
                                                        flex: 1,
                                                        cursor: 'pointer',
                                                        background: paymentMethod === 'paypal' ? '#f0f8ff' : '#fff',
                                                        boxShadow: paymentMethod === 'paypal' ? '0 2px 8px #0078d422' : 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        justifyContent: 'center'
                                                    }}
                                                    onClick={() => setPaymentMethod('paypal')}
                                                >
                                                    <img src={PaypalLogo} alt="PayPal" className="paypal-logo" />
                                                    <div style={{ fontWeight: 600 }}>PayPal</div>
                                                </div>
                                            </div>
                                            {paymentMethod === 'credit' && (
                                                <div style={{ marginBottom: '1.5rem' }}>
                                                    <input
                                                        type="text"
                                                        name="number"
                                                        placeholder="Número de tarjeta"
                                                        value={cardInfo.number}
                                                        onChange={handleCardInput}
                                                        maxLength={19}
                                                        style={{ marginBottom: '1rem' }}
                                                        required
                                                    />
                                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                                        <input
                                                            type="text"
                                                            name="expiry"
                                                            placeholder="MM/AA"
                                                            value={cardInfo.expiry}
                                                            onChange={handleCardInput}
                                                            maxLength={5}
                                                            style={{ flex: 1, marginBottom: '1rem' }}
                                                            required
                                                        />
                                                        <input
                                                            type="text"
                                                            name="cvv"
                                                            placeholder="CVV"
                                                            value={cardInfo.cvv}
                                                            onChange={handleCardInput}
                                                            maxLength={4}
                                                            style={{ flex: 1, marginBottom: '1rem' }}
                                                            required
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Nombre en la tarjeta"
                                                        value={cardInfo.name}
                                                        onChange={handleCardInput}
                                                        style={{ marginBottom: '1rem' }}
                                                        required
                                                    />
                                                </div>
                                            )}
                                            {paymentMethod === 'paypal' && (
                                                <div style={{ marginBottom: '1.5rem', color: '#0078d4', fontWeight: 500 }}>
                                                    Serás redirigido a PayPal para completar el pago (simulado)
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                                <button type="button" className="pay-button" style={{background: '#eee', color: '#222'}} onClick={handleBack}>Atrás</button>
                                                <button type="button" className="pay-button" onClick={handleNext}>Siguiente</button>
                                            </div>
                                        </section>
                                    )}
                                    {step === 3 && (
                                        <section className="checkout-section">
                                            <h2>Confirmar y pagar</h2>
                                            <div style={{marginBottom: '1.5rem'}}>
                                                <h4>Dirección de entrega</h4>
                                                <div><b>{contactInfo.name} {contactInfo.lastName}</b></div>
                                                <div>{contactInfo.address}</div>
                                                <div>{selectedWarehouse?.name} - {selectedWarehouse?.location}</div>
                                                <div>{contactInfo.email}</div>
                                            </div>
                                            <div style={{marginBottom: '1.5rem'}}>
                                                <h4>Método de pago</h4>
                                                {paymentMethod === 'credit' ? (
                                                    <div>
                                                        <div>Tarjeta de crédito</div>
                                                        <div style={{ fontSize: '0.95rem', color: '#666' }}>**** **** **** {cardInfo.number.slice(-4)}</div>
                                                        <div style={{ fontSize: '0.95rem', color: '#666' }}>{cardInfo.name}</div>
                                                    </div>
                                                ) : (
                                                    <div>PayPal</div>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <button type="button" className="pay-button" style={{background: '#eee', color: '#222'}} onClick={handleBack}>Atrás</button>
                                                <button type="submit" className="pay-button">Pagar ahora</button>
                                            </div>
                                        </section>
                                    )}
                                </form>
                            )}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>

            <div className="order-summary">
                {userCart.map((item, index) => (
                    <div key={index} className="order-item">
                        <div className="item-image-container">
                            <img src={item.mainImage} alt={item.name} className="item-image" />
                        </div>
                        <div className="item-details">
                            <p className="item-name">{item.name}</p>
                            <p className="item-price">
                                ${Number(item.price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </p>
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