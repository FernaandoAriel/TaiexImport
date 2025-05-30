import React from 'react';
import './css/sobreNosotros.css';
import carroNegro from './img/carronegro.jpg';
import carroFondo from './img/carrofondo.jpg';
import carroRojo from './img/carrorojo.jpg';

const SobreNosotros = () => {
  return (
    <><><div className="sobre-nosotros-container">
      {/* Banner diagonal rojo */}
      <div className="diagonal-banner"></div>

      {/* Sección superior con fondo blanco */}
      <div className="top-white-section">
        <div className="content-wrapper">
          <h1 className="titulo">SOMOS TAIEX</h1>

          <p className="descripcion-principal">
            En Taiex Import, nuestra pasión son los vehículos asiáticos. Nos
            especializamos en la importación de una amplia gama de
            automóviles, desde sedanes elegantes hasta SUV robustos y
            camionetas potentes, todos provenientes de los Estados Unidos.
            Nuestra misión es brindar a nuestros clientes acceso a vehículos de
            alta calidad, con un historial comprobado y a precios competitivos.
          </p>
        </div>
      </div>

      {/* Imagen flotante */}
      <div className="imagen-flotante">
        <img
          src={carroNegro}
          alt="Vehículo importado Taiex"
          className="vehiculo-imagen" />
      </div>

      {/* Footer rojo con texto */}
      <div className="footer-banner">
        <div className="footer-texto">
          <p>
            En Taiex Import, nuestra pasión son los vehículos asiáticos. Nos especializamos en la importación
            de una amplia gama de automóviles, desde sedanes elegantes hasta SUV robustos y
            camionetas potentes, todos provenientes de los Estados Unidos. Nuestra misión es brindar a
            nuestros clientes acceso a vehículos de alta calidad, con un historial comprobado y a precios
            competitivos.
          </p>
        </div>
      </div>
    </div>

      <div className="nuestra-mision-container">
        <div className="mision-image">
          <img src={carroRojo} alt="Vehículo importado" />
        </div>
        <div className="mision-content">
          <h2 className="mision-title">Nuestra Misión</h2>
          <p className="mision-description">
            Ofrecer una experiencia de compra en línea ágil y personalizada para accesorios y vehículos, conectando a los entusiastas del automovilismo con una amplia selección de productos de calidad importados desde Estados Unidos a través de una plataforma digital intuitiva y fácil de usar.
          </p>
        </div>
      </div>

      <div className="nuestra-vision-container">
        <div className="vision-content">
          <h2 className="vision-title">Nuestra Visión</h2>
          <p className="vision-description">
            Ser la plataforma digital líder en el mercado latinoamericano para la compra de accesorios y vehículos importados desde 
            Estados Unidos, ofreciendo la mejor experiencia de usuario a través de una plataforma intuitiva y fácil de usar, una amplia 
            selección de productos de calidad, información clara y detallada, herramientas y funcionalidades innovadoras que faciliten la
            búsqueda y la compra.
          </p>
        </div>
        <div className="vision-image">
          <img src={carroFondo} alt="Vehículo importado" />
        </div>
      </div>
      
      </><div className="top-white-sections">
        <div className="content-wrapper">
          <h1 className="titulo">LA FILOSOFÍA DEL EXITO</h1>
s
          <p className="descripcion-principal">
            En Taiex Import, nuestra filosofía se centra en la transparencia y la confianza, pilares que guían cada uno de 
            nuestros servicios: desde la importación directa y la rigurosa inspección de vehículos, hasta la gestión de trámites 
            aduanales y el ofrecimiento de opciones de financiamiento y garantía. Nos comprometemos a brindar una experiencia de compra 
            excepcional, asegurando la calidad y autenticidad de cada vehículo asiático que ofrecemos, y poniendo a disposición de 
            nuestros clientes un equipo de expertos para garantizar su plena satisfacción.
          </p>
        </div>
      </div></>

  );
};

export default SobreNosotros;