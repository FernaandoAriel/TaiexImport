import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="navbar-container" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      {/* Línea superior blanca */}
      <nav 
        className={`navbar-top ${scrolled ? "scrolled" : ""}`} 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff', 
          padding: '1rem 2rem',
          boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        {/* Logo */}
        <Link 
          to="/" 
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img src="path/to/logo.png" alt="Logo" style={{ height: '40px', marginRight: '0.5rem' }} />
        </Link>

        {/* Menú para desktop */}
        <div 
          className="desktop-menu"
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <NavLink to="/" text="Inicio" />
          <NavLink to="/marcas" text="Marcas" />
          <Link to="/favoritos" style={{ color: '#000' }}>❤️</Link>
          <Link to="/carrito" style={{ color: '#000' }}>🛒</Link>
          <Link to="/perfil" style={{ color: '#000' }}>👤</Link>
        </div>

        {/* Botón de menú móvil */}
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            padding: '0.5rem'
          }}
        >
          {/* Hamburger Menu Icon */}
          <div style={{ width: '25px', height: '3px', backgroundColor: '#000', margin: '5px 0' }}></div>
          <div style={{ width: '25px', height: '3px', backgroundColor: '#000', margin: '5px 0' }}></div>
          <div style={{ width: '25px', height: '3px', backgroundColor: '#000', margin: '5px 0' }}></div>
        </button>
      </nav>

      {/* Línea inferior negra */}
      <div 
        className="navbar-bottom"
        style={{
          display: 'flex',
          justifyContent: 'end',
          backgroundColor: '#000',
          padding: '0.7rem 4rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          <NavLinkDark to="/sobrenosotros" text="Sobre Nosotros" />
          <NavLinkDark to="/contactanos" text="Contáctanos" />
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <div 
        className="mobile-menu"
        style={{
          display: mobileMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          gap: '1.5rem',
          position: 'fixed',
          top: '70px',
          width: '100%',
          backgroundColor: 'white',
          padding: '1rem',
        }}
      >
        <MobileNavLink to="/" text="Inicio" onClick={() => setMobileMenuOpen(false)} />
        <MobileNavLink to="/marcas" text="Marcas" onClick={() => setMobileMenuOpen(false)} />
        <MobileNavLink to="/sobrenosotros" text="Sobre Nosotros" onClick={() => setMobileMenuOpen(false)} />
        <MobileNavLink to="/contactanos" text="Contáctanos" onClick={() => setMobileMenuOpen(false)} />
        <MobileNavLink to="/favoritos" text="Favoritos" onClick={() => setMobileMenuOpen(false)} />
        <MobileNavLink to="/carrito" text="Carrito" onClick={() => setMobileMenuOpen(false)} />
        <MobileNavLink to="/perfil" text="Mi Cuenta" onClick={() => setMobileMenuOpen(false)} />
      </div>
    </div>
  );
}

// Componente para enlaces de navegación (Desktop - Barra blanca)
function NavLink({ to, text }) {
  return (
    <Link
      to={to}
      style={{
        color: '#000',
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '1rem',
      }}
    >
      {text}
    </Link>
  );
}

// Componente para enlaces de navegación (Desktop - Barra negra)
function NavLinkDark({ to, text }) {
  return (
    <Link
      to={to}
      style={{
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '1rem',
      }}
    >
      {text}
    </Link>
  );
}

// Componente para enlaces de navegación (Mobile)
function MobileNavLink({ to, text, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        color: '#000',
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '1.2rem',
      }}
    >
      {text}
    </Link>
  );
}

// CSS que podrías agregar en tu archivo de estilos
// @media (max-width: 768px) {
//   .desktop-menu {
//     display: none !important;
//   }
//   .mobile-menu-button {
//     display: block !important;
//   }
// }