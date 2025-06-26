import React from 'react';
import { Link } from 'react-router-dom';

const CartMenu = ({ cart, cartMenuOpen, setCartMenuOpen, removeFromCart }) => (
  <div
    className="cart-menu"
    style={{
      position: 'fixed',
      top: 0,
      right: cartMenuOpen ? '0' : '-300px',
      width: '300px',
      height: '100vh',
      backgroundColor: 'white',
      transition: 'right 0.3s ease',
      padding: '2rem',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      zIndex: 1001,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <h2 style={{ margin: 0 }}>Carrito</h2>
      <button
        onClick={() => setCartMenuOpen(false)}
        style={{
          color: '#000',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.5rem'
        }}
      >
        ✕
      </button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No hay productos en el carrito</p>
      ) : (
        <>
          {cart.map((vehicle) => (
            <div
              key={`${vehicle.brandName}-${vehicle.id}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '1rem',
                position: 'relative'
              }}
            >
              <button
                onClick={() => removeFromCart(vehicle.id, vehicle.brandName)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                ×
              </button>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <img
                  src={vehicle.mainImage}
                  alt={vehicle.name}
                  style={{
                    width: '70px',
                    height: '50px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
                <div>
                  <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1rem' }}>{vehicle.name}</h4>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>{vehicle.price}</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <Link
                  to={`/marcas/${vehicle.brandName}/${vehicle.id}`}
                  onClick={() => setCartMenuOpen(false)}
                  style={{
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    color: '#666'
                  }}
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
          <Link
            to="/checkout"
            state={{ items: cart }}
            onClick={() => setCartMenuOpen(false)}
            style={{
              marginTop: '1rem',
              padding: '0.7rem 1.2rem',
              background: '#c00',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            Comprar
          </Link>
        </>
      )}
    </div>
  </div>
);

export default CartMenu; 