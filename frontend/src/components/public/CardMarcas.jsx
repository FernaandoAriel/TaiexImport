import React from 'react';
import { Link } from 'react-router-dom';

const CardMarcas = ({ car, brandName }) => {
    // Obtener el primer carácter del modelo para el placeholder
    const getModelInitial = () => {
        if (car.modelo) {
            return car.modelo.charAt(0).toUpperCase();
        }
        if (car.name) {
            return car.name.charAt(0).toUpperCase();
        }
        return 'V';
    };

    // Obtener el nombre del modelo
    const getModelName = () => {
        return car.modelo || car.name || "Modelo";
    };

    // Obtener la descripción
    const getDescription = () => {
        return car.carDetails || car.description || "Descripción no disponible";
    };

    // Obtener la categoría
    const getCategory = () => {
        if (car.idBodyWork && car.idBodyWork.bodyWork) {
            return car.idBodyWork.bodyWork.toUpperCase();
        }
        return car.category ? car.category.toUpperCase() : 'VEHÍCULO';
    };

    // Obtener el ID del vehículo
    const getVehicleId = () => {
        return car._id || car.id;
    };

    return (
        <div className="marca-card">
            {/* Imagen o placeholder */}
            {car.imgVehicle ? (
                <div className="car-image-placeholder">
                    <img 
                        src={car.imgVehicle} 
                        alt={getModelName()}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
            ) : (
                <div className="car-image-placeholder">
                    <div className="image-replacement">
                        {getModelInitial()}
                    </div>
                </div>
            )}
            
            {/* Contenido de la tarjeta */}
            <div className="marca-card-content">
                {/* Marca en mayúsculas */}
                <div className="car-brand">
                    {brandName ? brandName.toUpperCase() : 'MARCA'}
                </div>
                
                {/* Nombre del modelo */}
                <h3>{getModelName()}</h3>
                
                {/* Descripción */}
                <p>{getDescription()}</p>
                
                {/* Categoría */}
                <div className="car-category">
                    {getCategory()}
                </div>
                
                {/* Botón "Conoce más" */}
                <Link 
                    to={`/marcas/${brandName?.toLowerCase()}/${getVehicleId()}`} 
                    className="vehicle-button"
                >
                    CONOCE MÁS →
                </Link>
            </div>
        </div>
    );
};

export default CardMarcas;