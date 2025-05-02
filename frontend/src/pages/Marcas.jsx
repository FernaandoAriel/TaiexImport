import React, { useState } from 'react';
import './css/Marcas.css';
import NavbarCatalogo from '../components/navbar/NavbarCatalogo';
import CardMarcas from '../components/CardMarcas';

const Marcas = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Base de datos de vehículos con sus categorías
  const cars = [
    {
      id: 1,
      name: "Nuevo Nissan Versa",
      description: "Desafiamos nuevos límites",
      category: "Sedan",
      image: "https://example.com/versa.jpg"
    },
    {
      id: 2,
      name: "Sentra",
      description: "Conoce a tu par",
      category: "Sedan",
      image: "https://example.com/sentra.jpg"
    },
    {
      id: 3,
      name: "March",
      description: "Compacto y eficiente",
      category: "Hatchback",
      image: "https://example.com/march.jpg"
    },
    {
      id: 4,
      name: "Qashqai",
      description: "Conducción más segura",
      category: "SUV",
      image: "https://example.com/qashqai.jpg"
    },
    {
      id: 5,
      name: "Pathfinder",
      description: "Elige quien traza el rumbo",
      category: "SUV",
      image: "https://example.com/pathfinder.jpg"
    },
    {
      id: 6,
      name: "Frontier",
      description: "Potencia y rendimiento",
      category: "PickUp",
      image: "https://example.com/frontier.jpg"
    },
    {
      id: 7,
      name: "Altima",
      description: "Elegancia y potencia",
      category: "Sedan",
      image: "https://example.com/altima.jpg"
    },
    {
      id: 8,
      name: "Murano",
      description: "Lujo y confort",
      category: "SUV",
      image: "https://example.com/murano.jpg"
    }
  ];

  // Función para filtrar los vehículos
  const getFilteredCars = () => {
    if (activeCategory === 'Todos') return cars;
    return cars.filter(car => car.category === activeCategory);
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <main className="marcas-container">
          <h1 className="marcas-title">Catálogo Nissan</h1>
          
          <NavbarCatalogo 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          
          <div className="marcas-grid">
            {getFilteredCars().map(car => (
              <CardMarcas car={car} />
            ))}
          </div>

          {getFilteredCars().length === 0 && (
            <div className="no-results">
              No hay vehículos disponibles en esta categoría.
            </div>
          )}
        </main>
      </div>

      <footer className="marcas-footer">
        <p>© {new Date().getFullYear()} Catálogo Nissan - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Marcas;  