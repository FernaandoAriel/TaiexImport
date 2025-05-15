import React from 'react';

export default function VehicleRating({ rating }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "star filled" : "star"}
          style={{
            fontSize: '24px',
            color: i <= rating ? '#ffd700' : '#e4e5e9',
            marginRight: '5px'
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="vehicle-ratings">
      <div className="rating-stars">
        {renderStars()}
      </div>
    </section>
  );
}