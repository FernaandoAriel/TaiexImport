// VehicleDetails.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css/VehicleDetails.css';
import { useFavorites } from '../pages/FavoriteContext.jsx'; // Ajusta la ruta según tu estructura de archivos

// Importa imágenes (ajusta las rutas según tu estructura)
import QashqaiMain from "./img/qashqai.png";
import QashqaiThumb2 from "./img/qashqai.png";
import QashqaiThumb3 from "./img/qashqai.png";
import QashqaiThumb1 from "./img/qashqai.png";

const VehicleDetails = () => {
    const { brandName, vehicleId } = useParams();
    const [selectedImage, setSelectedImage] = useState(QashqaiMain);
    const { addToFavorites, favorites } = useFavorites();
    
    // Verificar si este vehículo ya está en favoritos
    const isInFavorites = favorites.some(
        fav => fav.id === parseInt(vehicleId) && fav.brandName === brandName
    );

    // Datos del vehículo (en un proyecto real, estos datos vendrían de una API o base de datos)
    const vehicleData = {
        id: parseInt(vehicleId), // Convertir el ID a número
        brandName: brandName,    // Incluir el nombre de la marca
        name: "Nissan Qashqai 2024",
        description: "El Nissan Qashqai 2024 llega con un diseño renovado, tecnología avanzada y un rendimiento optimizado para conquistar tanto la ciudad como la carretera. Este SUV compacto combina elegancia y funcionalidad, ofreciendo una experiencia de conducción dinámica y segura.",
        heroText: "Imagina conducir el Nissan Qashqai 2024 al atardecer, con su techo panorámico y tecnología avanzada. Cada viaje es suave, seguro y lleno de estilo, ya sea en la ciudad o la carretera. ¡Confort y rendimiento en cada kilómetro!",
        sections: [
            {
                title: "Rendimiento",
                content: "El Qashqai 2024 está disponible con un motor híbrido ligero de 1.3 litros con tecnología Mild Hybrid (MHEV), que ofrece una potencia de 140 CV o 158 CV dependiendo de la versión. Este sistema no solo mejora la eficiencia de combustible, sino que también reduce las emisiones de CO₂, logrando un consumo combinado de aproximadamente 5.3-5.8 L/100 Km. La transmisión Xtronic CVT garantiza una conducción suave y sin interrupciones, mientras que el modo Eco y Sport permiten adaptar el comportamiento del vehículo a tus necesidades."
            },
            {
                title: "Equipamiento",
                content: "El Qashqai 2024 destaca por su equipamiento tecnológico de vanguardia. Incluye una pantalla táctil de 12.3 pulgadas con sistema de infoentretenimiento NissanConnect, compatibilidad con Apple CarPlay y Android Auto, y un cuadro de instrumentos digital de 12.3 pulgadas. Además, cuenta con asientos ergonómicos con opción de calefacción, volante multifunción revestido en cuero, y techo panorámico solar. La iluminación LED en faros y luces traseras no solo mejora la visibilidad, sino que también aporta un toque moderno al diseño."
            },
            {
                title: "Seguridad",
                content: "Nissan ha equipado al Qashqai 2024 con su sistema ProPILOT, que ofrece asistencia semiautónoma en la conducción, incluyendo control de crucero adaptativo, mantenimiento de carril y frenado de emergencia. También incluye Airbags de cortina, Control de Estabilidad y Tracción, Sistema de Detección de Ángulo Muerto, Alerta de Tráfico Cruzado y Asistente de Estacionamiento Inteligente 360°. Estas características lo convierten en uno de los SUV más seguros de su categoría."
            }
        ],
        images: [QashqaiMain, QashqaiThumb1, QashqaiThumb2, QashqaiThumb3],
        mainImage: QashqaiMain, // Añadir imagen principal para mostrar en favoritos
        rating: 4,
        price: "35,990 USD" // Añadir un precio para mostrar
    };

    // Función para manejar la adición a favoritos
    const handleAddToFavorites = () => {
        addToFavorites(vehicleData);
        // Opcional: Mostrar una notificación de éxito
        alert("¡Añadido a favoritos!");
    };

    // Renderizar estrellas para la valoración
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i <= rating ? "star filled" : "star"}
                    style={{
                        fontSize: '24px',
                        color: i <= rating ? '#ffd700' : '#e4e5e9',
                        marginRight: '5px',
                        cursor: 'pointer'
                    }}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="vehicle-detail-container">
            {/* Hero Section */}
            <section
                className="vehicle-hero"
                style={{
                    backgroundImage: `url(${QashqaiMain})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>{vehicleData.name}</h1>
                        <p>{vehicleData.heroText}</p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="vehicle-main-content">
                <div className="vehicle-images">
                    <div className="main-image">
                        <img src={selectedImage} alt={vehicleData.name} />
                    </div>
                    <div className="thumbnail-gallery">
                        {vehicleData.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${vehicleData.name} vista ${index + 1}`}
                                onClick={() => setSelectedImage(img)}
                                className={selectedImage === img ? 'active' : ''}
                            />
                        ))}
                    </div>
                </div>

                <div className="vehicle-info">
                    <h2>{vehicleData.name}</h2>
                    <p className="vehicle-description">{vehicleData.description}</p>
                </div>
            </section>

            {/* Info Sections */}
            {vehicleData.sections.map((section, index) => (
                <section key={index} className="vehicle-info-section">
                    <h2>{section.title}</h2>
                    <p>{section.content}</p>
                </section>
            ))}

            {/* Call to Action */}
            <section className="vehicle-actions">
                <button className="action-button primary">Cotizalo</button>
                <button 
                    className="action-button secondary"
                    onClick={handleAddToFavorites}
                    disabled={isInFavorites}
                    style={{ 
                        opacity: isInFavorites ? 0.7 : 1,
                        cursor: isInFavorites ? 'default' : 'pointer'
                    }}
                >
                    {isInFavorites ? "En favoritos" : "Añadir a Favoritos"}
                    <span className="heart-icon" style={{ color: isInFavorites ? '#e74c3c' : 'inherit' }}>
                        {isInFavorites ? "♥" : "♡"}
                    </span>
                </button>
            </section>

            {/* Ratings */}
            <section className="vehicle-ratings">
                <div className="rating-stars">
                    {renderStars(vehicleData.rating)}
                </div>
            </section>

            {/* Comments */}
            <section className="vehicle-comments">
                <button className="comment-button">Comentar</button>
            </section>
        </div>
    );
};

export default VehicleDetails;