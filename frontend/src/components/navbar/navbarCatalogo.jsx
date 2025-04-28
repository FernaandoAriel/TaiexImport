import React from 'react';
import './css/NavbarCatalogo.css'; // Asegúrate de que la ruta sea correcta

const NavbarCatalogo = ({ activeCategory, setActiveCategory, categories = ['Todos', 'Sedan', 'SUV', 'Hatchback', 'PickUp'] }) => {
  return (
    <nav className="navbar-catalogo">
      <ul className="category-list">
        {categories.map((category) => (
          <li 
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarCatalogo;