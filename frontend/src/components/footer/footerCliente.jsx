import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './css/footerCliente.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Nuestras marcas</h3>
          <div className="brands-grid">
            <div className="brands-column">
              <Link to="/marcas">Nissan</Link>
              <Link to="/marcas">Honda</Link>
              <Link to="/marcas/">Toyota</Link>
              <Link to="/marcas/">Lexus</Link>
              <Link to="/marcas/">Mitsubishi</Link>
            </div>
            <div className="brands-column">
              <Link to="/marcas/">Kia</Link>
              <Link to="/marcas/">Suzuki</Link>
              <Link to="/marcas/">Hyundai</Link>
              <Link to="/marcas/">Mazda</Link>
              <Link to="/marcas/">Subaru</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Sobre Nosotros</h3>
          <Link to="/sobrenosotros">Somos Taiex</Link>
          <Link to="/sobrenosotros">Nuestra Misión</Link>
          <Link to="/sobrenosotros">Nuestra Visión</Link>
          <Link to="/sobrenosotros">Filosofía del éxito</Link>
        </div>
        
        <div className="footer-section">
          <h3>Contáctanos</h3>
          <div className="social-links">
            <Link to="/twitter" className="contact-link">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </Link>
            <Link to="/facebook" className="contact-link">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </Link>
            <Link to="/instagram" className="contact-link">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Taiex Import. Todos los derechos reservados.</p>
        <Link to="/terminos">Términos y condiciones</Link>
      </div>
    </footer>
  );
};

export default Footer;