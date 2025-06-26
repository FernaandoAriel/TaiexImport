import React from 'react';
import { Link } from 'react-router-dom';
import './Catalogo/css/vehicle.css';

export default function VehicleCard({ car, brandName }) {
  return (
    <div className="vehicle-card">
      {/* Imagen o placeholder */}
      {car.imgVehicle ? (
        <img
          className="vehicle-card__img"
          src={car.imgVehicle}
          alt={car.modelo || "Vehículo"}
        />
      ) : (
        <div className="vehicle-card__placeholder">
          {car.modelo ? car.modelo.charAt(0).toUpperCase() : 'V'}
        </div>
      )}

      {/* Contenido */}
      <div className="vehicle-card__content">
        {/* Marca */}
        <div className="vehicle-card__brand">{brandName}</div>

        {/* Título del modelo */}
        <div className="vehicle-card__title">{car.modelo || "Modelo"}</div>

        {/* Descripción */}
        <div className="vehicle-card__desc">
          {car.carDetails || "Descripción no disponible"}
        </div>

        {/* Botón como Link */}
        <Link
          to={`/marcas/${brandName}/${car._id}`}
          className="vehicle-card__btn"
        >
          CONOCE MÁS →
        </Link>
      </div>
    </div>
  );
}