import React, { useState } from 'react';
import MarcasLayout from '../../components/Catalogo/MarcasLayout';
import VehicleFilter from '../../components/Catalogo/VehicleFilter';
import VehicleGrid from '../../components/Catalogo/VehicleGrid';

// Datos podrían moverse a un archivo separado (ej. data/cars.js)


const Marcas = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const getFilteredCars = () => {
    if (activeCategory === 'Todos') return cars;
    return cars.filter(car => car.category === activeCategory);
  };

  return (
    <MarcasLayout title="Catálogo Nissan">
      <VehicleFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        vehicles={getFilteredCars()}
        renderResults={(filteredCars) => <VehicleGrid vehicles={filteredCars} />}
      />
    </MarcasLayout>
  );
};

export default Marcas;