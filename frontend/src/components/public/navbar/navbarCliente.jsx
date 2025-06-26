// Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFavorites } from '../../../pages/public/FavoriteContext.jsx'; 
import taiexLogo from '../../../pages/public/img/taiexLogo.png'; // Asegúrate de que la ruta sea correcta
import { useAuth } from '../../../context/AuthContext.jsx';
import { User } from 'lucide-react';

// Importamos imágenes de logos
import NissanLogo from "../../../pages/public/img/Nissan.png";
import HondaLogo from "../../../pages/public/img/Honda.png";
import ToyotaLogo from "../../../pages/public/img/Toyota.png";
import LexusLogo from "../../../pages/public/img/Lexus.png";
import MitsubishiLogo from "../../../pages/public/img/mitsubishi.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [favoritesMenuOpen, setFavoritesMenuOpen] = useState(false);
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const [brandsMenuOpen, setBrandsMenuOpen] = useState(false);
  const { favorites, removeFromFavorites } = useFavorites();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  // Definimos las marcas disponibles
  const brands = [
    { name: "Nissan", logo: NissanLogo, path: "/marcas/nissan" },
    { name: "Honda", logo: HondaLogo, path: "/marcas/honda" },
    { name: "Toyota", logo: ToyotaLogo, path: "/marcas/toyota" },
    { name: "Lexus", logo: LexusLogo, path: "/marcas/lexus" },
    { name: "Mitsubishi", logo: MitsubishiLogo, path: "/marcas/mitsubishi" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Manejador para cerrar el menú de marcas al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      const brandsMenu = document.getElementById("brands-menu");
      const brandsButton = document.getElementById("brands-button");

      if (brandsMenu && brandsButton &&
        !brandsMenu.contains(event.target) &&
        !brandsButton.contains(event.target)) {
        setBrandsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar menú de perfil al navegar a /login o /register
  useEffect(() => {
    if (profileMenuOpen && (location.pathname === "/login" || location.pathname === "/register")) {
      setProfileMenuOpen(false);
    }
  }, [location.pathname, profileMenuOpen]);

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
          <img src={taiexLogo} alt="Logo" style={{ height: '60px', marginRight: '1.5rem' }} />
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

          {/* Botón de Marcas con menú desplegable */}
          <div style={{ position: 'relative' }}>
            <button
              id="brands-button"
              onClick={() => setBrandsMenuOpen(!brandsMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '1rem',
                color: '#000',
              }}
            >
              Marcas
            </button>

            {/* Menú desplegable de marcas */}
            {brandsMenuOpen && (
              <div
                id="brands-menu"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '320px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  padding: '1.5rem',
                  marginTop: '10px',
                  zIndex: 1002,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.5rem',
                }}
              >
                {brands.map((brand, index) => (
                  <Link
                    key={index}
                    to={brand.path}
                    onClick={() => setBrandsMenuOpen(false)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textDecoration: 'none',
                      padding: '0.8rem',
                      borderRadius: '5px',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <img
                      src={brand.logo}
                      alt={`${brand.name} Logo`}
                      style={{
                        height: '40px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <span style={{ color: '#333', fontSize: '0.9rem' }}>{brand.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setFavoritesMenuOpen(!favoritesMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              position: 'relative'
            }}
          >
            ❤️
            {favorites.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#e74c3c',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {favorites.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setCartMenuOpen(!cartMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem'
            }}
          >
            🛒
          </button>
          {/* Botón de 👤 para iniciar sesión o menú de perfil de usuario */}
          {!isAuthenticated() ? (
            <Link
              to="/login"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem',
                color: '#000',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                padding: 0
              }}
              title="Iniciar sesión"
            >
              <span role="img" aria-label="Iniciar sesión" style={{ fontSize: '1.7rem' }}>👤</span>
            </Link>
          ) : (
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.2rem',
                color: '#000',
              }}
            >
              <User size={24} />
              <span style={{ fontWeight: 500 }}>{user?.firstName || 'Perfil'}</span>
            </button>
          )}
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

      {/* Menú de perfil deslizable */}
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

      {/* Menú de favoritos deslizable */}
      <div
        className="favorites-menu"
        style={{
          position: 'fixed',
          top: 0,
          right: favoritesMenuOpen ? '0' : '-350px',
          width: '350px', // Un poco más ancho para mostrar mejor los items
          height: '100vh',
          backgroundColor: 'white',
          transition: 'right 0.3s ease',
          padding: '2rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          zIndex: 1001,
          overflowY: 'auto' // Para permitir scroll si hay muchos favoritos
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: 0 }}>Favoritos</h2>
          <button
            onClick={() => setFavoritesMenuOpen(false)}
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
          {favorites.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No hay productos en favoritos</p>
          ) : (
            favorites.map((vehicle) => (
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
                  onClick={() => removeFromFavorites(vehicle.id, vehicle.brandName)}
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
                    onClick={() => setFavoritesMenuOpen(false)}
                    style={{
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                      color: '#666'
                    }}
                  >
                    Ver detalles
                  </Link>

                  <Link
                    to="/checkout"
                    state={{ items: [vehicle] }}
                    onClick={() => setFavoritesMenuOpen(false)}
                    style={{
                      padding: '0.3rem 0.8rem',
                      background: '#c00',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      display: 'inline-block',
                      textAlign: 'center'
                    }}
                  >
                    Comprar
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Menú de carrito deslizable */}
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
          <p style={{ textAlign: 'center', color: '#666' }}>No hay productos en el carrito</p>
        </div>
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
