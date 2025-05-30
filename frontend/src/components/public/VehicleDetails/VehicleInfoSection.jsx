import React from 'react';

export default function VehicleInfoSection({ title, content }) {
  return (
    <section className="vehicle-info-section">
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
}