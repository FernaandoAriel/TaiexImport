import React from "react";
import { FaMoneyBillWave, FaCarAlt, FaTools } from "react-icons/fa";

export default function ServicesSection() {
  const services = [
    { 
      icon: <FaMoneyBillWave />, 
      title: "Escoge tu precio",
      description: "Selecciona el rango de precio que mejor se adapte a tu presupuesto y encuentra las mejores opciones disponibles."
    },
    { 
      icon: <FaCarAlt />, 
      title: "Datos Vehículo Preferido",
      description: "Proporciona los detalles específicos del vehículo que buscas: marca, modelo, año y características especiales."
    },
    { 
      icon: <FaTools />, 
      title: "Diseña tu marca favorita",
      description: "Personaliza y configura tu marca preferida con las opciones y características que más te gusten."
    },
  ];

  return (
    <>
      <style jsx>{`
        .service-item {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .service-description {
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          margin-top: 0.5rem;
          padding: 0 1rem;
          text-align: center;
          color: #666;
          font-size: 0.95rem;
          line-height: 1.4;
        }
        
        .service-item:hover .service-description {
          opacity: 1;
          max-height: 100px;
          padding: 0.75rem 1rem;
        }
        
        @media (max-width: 768px) {
          .service-description {
            font-size: 0.8rem;
            padding: 0 0.5rem;
          }
          
          .service-item:hover .service-description {
            max-height: 120px;
            padding: 0.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .service-description {
            font-size: 0.75rem;
          }
          
          .service-item:hover .service-description {
            max-height: 140px;
          }
        }
      `}</style>
      
      <section className="services-section">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <div className="service-description">
              {service.description}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}