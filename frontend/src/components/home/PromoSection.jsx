import React from "react";

export default function PromoSection({ image, title, description }) {
  return (
    <section className="promo-section">
      <div className="promo-image">
        <img src={image} alt={title} />
      </div>
      <div className="promo-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </section>
  );
}