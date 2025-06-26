import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../pages/public/cartContex.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-hot-toast';

const CardMarcas = ({ car, brandName }) => {
    const { addToCart, cart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const vehicleData = {
        id: car._id || car.id,
        brandName: brandName,
        name: car.modelo || car.name,
        description: car.carDetails || car.description,
        mainImage: car.imgVehicle,
        price: car.price,
        year: car.year,
        equipment: car.equipment,
        discount: car.discount,
        customerId: user?._id || null
    };
    const isInCart = cart.some(item => item.id === vehicleData.id && item.brandName === brandName && item.customerId === user?._id);
    const handleAddToCart = () => {
        if (!isAuthenticated() || !user?._id) {
            toast.error('Debes iniciar sesión para agregar al carrito.');
            return;
        }
        addToCart(vehicleData);
        toast.success('¡Añadido al carrito!');
    };

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

                {/* Botón 'Agregar al carrito' */}
                <button
                    style={{
                        marginTop: '0.7rem',
                        width: '100%',
                        background: isInCart ? '#ccc' : '#d50000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.7rem 0',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: isInCart ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s'
                    }}
                    onClick={handleAddToCart}
                    disabled={isInCart}
                >
                    {isInCart ? 'Agregado en carrito' : 'Agregar al carrito'}
                </button>
            </div>
        </div>
    );
};

export default CardMarcas;