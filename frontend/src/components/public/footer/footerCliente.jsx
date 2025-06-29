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
              <Link to="/marcas/nissan">Nissan</Link>
              <Link to="/marcas/honda">Honda</Link>
              <Link to="/marcas/toyota">Toyota</Link>
              <Link to="/marcas/lexus">Lexus</Link>
              <Link to="/marcas/mitsubishi">Mitsubishi</Link>
            </div>
            <div className="brands-column">
              <Link to="/marcas/kia">Kia</Link>
              <Link to="/marcas/suzuki">Suzuki</Link>
              <Link to="/marcas/hyundai">Hyundai</Link>
              <Link to="/marcas/mazda">Mazda</Link>
              <Link to="/marcas/subaru">Subaru</Link>
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
        <div className="footer-bottom-content">
          <p>© 2025 Taiex Import. Todos los derechos reservados.</p>
          <Link to="/terminos">Términos y condiciones</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;