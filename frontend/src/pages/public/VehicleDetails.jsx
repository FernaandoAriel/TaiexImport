import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // <-- agrega useNavigate aquí
import { useFavorites } from '../public/FavoriteContext.jsx';
import { useCart } from '../public/cartContex.jsx';
import VehicleHero from '../../components/public/VehicleDetails/VehicleHero.jsx';
import VehicleGallery from '../../components/public/VehicleDetails/VehicleGallery.jsx';
import VehicleInfoSection from '../../components/public/VehicleDetails/VehicleInfoSection.jsx';
import VehicleRating from '../../components/public/VehicleDetails/VehicleRating.jsx';
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import './css/VehicleDetails.css';

const VehicleDetails = () => {
    const { brandName, vehicleId } = useParams();
    const navigate = useNavigate(); // <-- inicializa navigate
    const { addToFavorites, favorites } = useFavorites();
    const { addToCart, cart } = useCart();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/api/Rvehicles/${vehicleId}`)
            .then(res => res.json())
            .then(data => setVehicle(data));
    }, [vehicleId]);

    if (!vehicle) return <div>Cargando...</div>;

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

    const isInCart = cart.some(
        item => item.id === vehicleData.id && item.brandName === brandName
    );

    const handleAddToFavorites = () => {
        addToFavorites(vehicleData);
        alert("¡Añadido a favoritos!");
    };

    const handleAddToCart = () => {
        addToCart(vehicleData);
        alert("¡Añadido al carrito!");
    };

    const handleCotizar = () => {
        navigate("/cotizar", {
            state: {
                vehicle: {
                    ...vehicleData,
                    brandName: brandName
                }
            }
        });
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

            {/* Botones principales */}
            <div
                style={{
                    display: "flex",
                    gap: "1.5rem",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    alignItems: "center",
                    marginLeft: "calc(16vw + 16px)"
                }}
            >
                <button
                    style={{
                        background: "#d50000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.8rem 2.2rem",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(213,0,0,0.08)",
                        transition: "background 0.2s"
                    }}
                    onClick={handleCotizar}
                >
                    Cotízalo
                </button>
                <button
                    style={{
                        background: "#fff",
                        color: "#222",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        padding: "0.8rem 2.2rem",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        cursor: isInFavorites ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem"
                    }}
                    onClick={handleAddToFavorites}
                    disabled={isInFavorites}
                >
                    {isInFavorites ? "Agregado en favoritos" : "Añadir a Favoritos"} <FiHeart style={{ fontSize: "1.2rem" }} />
                </button>
                <button
                    style={{
                        background: "#fff",
                        color: "#222",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        padding: "0.8rem 2.2rem",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        cursor: isInCart ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem"
                    }}
                    onClick={handleAddToCart}
                    disabled={isInCart}
                >
                    {isInCart ? "Agregado en carrito" : "Agregar al carrito"} <FiShoppingCart style={{ fontSize: "1.2rem" }} />
                </button>
            </div>

            <VehicleRating rating={vehicleData.rating} />

            <section className="vehicle-comments">
                <button className="comment-button">Comentar</button>
            </section>
        </div>
    );
};

export default VehicleDetails;