import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../public/FavoriteContext.jsx';
import VehicleHero from '../../components/public/VehicleDetails/VehicleHero.jsx';
import VehicleGallery from '../../components/public/VehicleDetails/VehicleGallery.jsx';
import VehicleInfoSection from '../../components/public/VehicleDetails/VehicleInfoSection.jsx';
import VehicleActions from '../../components/public/VehicleDetails/VehicleActions.jsx';
import VehicleRating from '../../components/public/VehicleDetails/VehicleRating.jsx';
import './css/VehicleDetails.css';

// Importa imágenes
import QashqaiMain from "./img/qashqai.png";
import QashqaiThumb2 from "./img/qashqai.png";
import QashqaiThumb3 from "./img/qashqai.png";
import QashqaiThumb1 from "./img/qashqai.png";

const VehicleDetails = () => {
    const { brandName, vehicleId } = useParams();
    const { addToFavorites, favorites } = useFavorites();

    // Datos del vehículo (en un proyecto real vendrían de una API)
    const vehicleData = {
        id: parseInt(vehicleId),
        brandName: brandName,
        name: "Nissan Qashqai 2024",
        description: "El Nissan Qashqai 2024 llega con un diseño renovado...",
        heroText: "Imagina conducir el Nissan Qashqai 2024 al atardecer...",
        sections: [
            // ... secciones de información
        ],
        images: [QashqaiMain, QashqaiThumb1, QashqaiThumb2, QashqaiThumb3],
        mainImage: QashqaiMain,
        rating: 4,
        price: "35,990 USD"
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
                image={QashqaiMain} 
                name={vehicleData.name} 
                heroText={vehicleData.heroText} 
            />

            <section className="vehicle-main-content">
                <VehicleGallery images={vehicleData.images} name={vehicleData.name} />
                
                <div className="vehicle-info">
                    <h2>{vehicleData.name}</h2>
                    <p className="vehicle-description">{vehicleData.description}</p>
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