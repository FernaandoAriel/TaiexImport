import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../public/FavoriteContext.jsx';
import VehicleHero from '../../components/public/VehicleDetails/VehicleHero.jsx';
import VehicleGallery from '../../components/public/VehicleDetails/VehicleGallery.jsx';
import VehicleInfoSection from '../../components/public/VehicleDetails/VehicleInfoSection.jsx';
import VehicleActions from '../../components/public/VehicleDetails/VehicleActions.jsx';
import VehicleRating from '../../components/public/VehicleDetails/VehicleRating.jsx';
import './css/VehicleDetails.css';

const VehicleDetails = () => {
    const { brandName, vehicleId } = useParams();
    const { addToFavorites, favorites } = useFavorites();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/api/Rvehicles/${vehicleId}`)
            .then(res => res.json())
            .then(data => setVehicle(data));
    }, [vehicleId]);

    if (!vehicle) return <div>Cargando...</div>;

    // Puedes adaptar estos campos según tu modelo de datos
    const vehicleData = {
        id: vehicle._id,
        brandName: brandName,
        name: vehicle.modelo,
        description: vehicle.carDetails,
        heroText: vehicle.heroText || "",
        sections: vehicle.sections || [],
        images: vehicle.images || [vehicle.imgVehicle],
        mainImage: vehicle.imgVehicle,
        rating: vehicle.rating || 0,
        price: vehicle.price,
        year: vehicle.year,
        equipment: vehicle.equipment,
        discount: vehicle.discount,
    };

    const isInFavorites = favorites.some(
        fav => fav.id === vehicleData.id && fav.brandName === brandName
    );

    const handleAddToFavorites = () => {
        addToFavorites(vehicleData);
        alert("¡Añadido a favoritos!");
    };

    return (
        <div className="vehicle-detail-container">
            <VehicleHero 
                image={vehicleData.mainImage} 
                name={vehicleData.name} 
                heroText={vehicleData.heroText} 
            />

            <section className="vehicle-main-content">
                <VehicleGallery images={vehicleData.images} name={vehicleData.name} />
                
                <div className="vehicle-info">
                    <h2>{vehicleData.name}</h2>
                    <p className="vehicle-description">{vehicleData.description}</p>
                    <p>Año: {vehicleData.year}</p>
                    <p>Precio: ${vehicleData.price}</p>
                    <p>Equipamiento: {vehicleData.equipment}</p>
                    <p>Descuento: {vehicleData.discount}%</p>
                </div>
            </section>

            {vehicleData.sections.map((section, index) => (
                <VehicleInfoSection 
                    key={index}
                    title={section.title}
                    content={section.content}
                />
            ))}

            <VehicleActions 
                vehicleData={vehicleData}
                brandName={brandName}
                isInFavorites={isInFavorites}
                onAddToFavorites={handleAddToFavorites}
            />

            <VehicleRating rating={vehicleData.rating} />

            <section className="vehicle-comments">
                <button className="comment-button">Comentar</button>
            </section>
        </div>
    );
};

export default VehicleDetails;