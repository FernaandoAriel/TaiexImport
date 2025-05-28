import React from 'react';
import { Link } from 'react-router-dom';

export default function VehicleActions({ 
  vehicleData, 
  brandName, 
  isInFavorites, 
  onAddToFavorites 
}) {
  return (
    <section className="vehicle-actions">
      <Link
        to="/cotizar"
        state={{
          vehicle: {
            ...vehicleData,
            brandName: brandName
          }
        }}
        className="action-button primary"
      >
        Cotizalo
      </Link>
      <button
        className="action-button secondary"
        onClick={onAddToFavorites}
        disabled={isInFavorites}
        style={{
          opacity: isInFavorites ? 0.7 : 1,
          cursor: isInFavorites ? 'default' : 'pointer'
        }}
      >
        {isInFavorites ? "En favoritos" : "Añadir a Favoritos"}
        <span className="heart-icon" style={{ color: isInFavorites ? '#e74c3c' : 'inherit' }}>
          {isInFavorites ? "♥" : "♡"}
        </span>
      </button>
    </section>
  );
}