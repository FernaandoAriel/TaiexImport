import React from "react";
import { Link } from "react-router-dom";

export default function BrandsSection({ brands }) {
  return (
    <section className="brands-section">
      <div className="brand-logos">
        {brands.map((brand) => (
          <Link key={brand.id} to={`/marcas/${brand.name.toLowerCase()}`}>
            <img src={brand.logo} alt={brand.name} />
          </Link>
        ))}
      </div>
    </section>
  );
}