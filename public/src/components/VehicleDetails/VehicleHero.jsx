import React from 'react';

export default function VehicleHero({ image, name, heroText }) {
  return (
    <section
      className="vehicle-hero"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>{name}</h1>
          <p>{heroText}</p>
        </div>
      </div>
    </section>
  );
}