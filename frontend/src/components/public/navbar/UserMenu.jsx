import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = ({ user, logout, isAuthenticated, profileMenuOpen, setProfileMenuOpen }) => (
  <div
    className="profile-menu"
    style={{
      position: 'fixed',
      top: 0,
      right: profileMenuOpen ? '0' : '-300px',
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
      <h2 style={{ margin: 0 }}>Mi Cuenta</h2>
      <button
        onClick={() => setProfileMenuOpen(false)}
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
      {isAuthenticated() ? (
        <>
          <div style={{ marginBottom: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
            <div style={{ fontWeight: 600 }}>{user?.firstName} {user?.lastName}</div>
            <div style={{ fontSize: '0.95rem', color: '#888' }}>{user?.email}</div>
          </div>
          <button
            onClick={() => {
              setProfileMenuOpen(false);
              logout();
            }}
            style={{
              width: '100%',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 0',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            style={{
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
              textDecoration: 'none',
              color: '#000',
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            style={{
              padding: '1rem',
              backgroundColor: '#000',
              borderRadius: '5px',
              textDecoration: 'none',
              color: '#fff',
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Registrarse
          </Link>
        </>
      )}
    </div>
  </div>
);

export default UserMenu; 