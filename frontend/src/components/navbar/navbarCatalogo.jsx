import React from 'react';
import './css/NavbarCatalogo.css'; // Asegúrate de que la ruta sea correcta

const NavbarCatalogo = ({ activeCategory, setActiveCategory }) => {
  const categories = ['Todos', 'Sedan', 'SUV', 'PickUp', 'Familiar', 'Coupe', 'Hatchback'];

  return (
    <div className="catalogo-navbar-container">
      <nav className="catalogo-navbar">
        <div className="categories-container">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavbarCatalogo;