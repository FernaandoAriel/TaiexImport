import React from "react";
import { FaMoneyBillWave, FaCarAlt, FaTools } from "react-icons/fa";

export default function ServicesSection() {
  const services = [
    { icon: <FaMoneyBillWave />, title: "Escoge tu precio" },
    { icon: <FaCarAlt />, title: "Datos Vehículo Preferido" },
    { icon: <FaTools />, title: "Diseña tu marca favorita" },
  ];

  return (
    <section className="services-section">
      {services.map((service, index) => (
        <div key={index} className="service-item">
          <div className="service-icon">{service.icon}</div>
          <h3>{service.title}</h3>
        </div>
      ))}
    </section>
  );
}