import React from 'react';

const NavbarCatalogo = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <div className="catalogo-navbar-container">
      <nav className="catalogo-navbar">
        {categories.map(category => (
          <button
            key={category}
            className={`catalogo-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavbarCatalogo;