import React from "react";

export default function FeaturedVehicles({ vehicles }) {
  return (
    <section className="featured-vehicles">
      <h2>NUESTROS VEHÍCULOS MÁS COTIZADOS</h2>
      <div className="vehicle-list">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-item">
            <img src={vehicle.image} alt={vehicle.name} className="CarroFeatured" />
            <h4>{vehicle.name}</h4>
            <p>{vehicle.description}</p>
            <button className="vehicle-button">Conoce más →</button>
          </div>
        ))}
      </div>
    </section>
  );
}