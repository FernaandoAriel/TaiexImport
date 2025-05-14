import React from 'react';
import CardMarcas from '../components/CardMarcas';

export default function VehicleGrid({ vehicles }) {
  return (
    <div className="marcas-grid">
      {vehicles.map(car => (
        <CardMarcas key={car.id} car={car} />
      ))}
    </div>
  );
}