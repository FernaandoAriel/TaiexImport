import React from 'react';
import NavbarCatalogo from '../components/navbar/NavbarCatalogo';

export default function VehicleFilter({ 
  activeCategory, 
  setActiveCategory, 
  vehicles,
  renderResults 
}) {
  return (
    <>
      <NavbarCatalogo 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      
      {renderResults(vehicles)}
      
      {vehicles.length === 0 && (
        <div className="no-results">
          No hay vehículos disponibles en esta categoría.
        </div>
      )}
    </>
  );
}