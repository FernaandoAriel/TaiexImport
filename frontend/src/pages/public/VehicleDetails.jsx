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
import { toast } from 'react-hot-toast';
import useComments from '../../components/private/dashboard/hooks/useComments.js';
import { useAuth } from '../../context/AuthContext.jsx';

const VehicleDetails = () => {
    const { brandName, vehicleId } = useParams();
    const navigate = useNavigate(); // <-- inicializa navigate
    const { addToFavorites, favorites } = useFavorites();
    const { addToCart, cart, clearCart } = useCart();
    const [vehicle, setVehicle] = useState(null);
    const { comments, loading, error, refreshComments } = useComments();
    const { user, isAuthenticated } = useAuth();
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5);

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
        toast.success('¡Añadido a favoritos!');
    };

    const handleAddToCart = () => {
        addToCart(vehicleData);
        toast.success('¡Añadido al carrito!');
    };

    const handleBuyNow = async () => {
        if (!isAuthenticated() || !user?._id) {
            toast.error('Debes iniciar sesión para comprar.');
            navigate('/login');
            return;
        }
        await clearCart();
        await addToCart({ ...vehicleData, customerId: user._id });
        toast.success('¡Listo para comprar!');
        navigate('/checkout');
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

    // Filtrar comentarios de este vehículo
    const vehicleComments = comments.filter(c => c.idVehicle === vehicleId);

    // Agregar comentario
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!isAuthenticated() || !user?._id) {
            toast.error('Debes iniciar sesión para comentar.');
            return;
        }
        const newComment = {
            idCustomer: user._id,
            reviewText,
            rating,
            idVehicle: vehicleId,
        };
        const res = await fetch('http://localhost:4000/api/Rreviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        });
        if (res.ok) {
            toast.success('Comentario publicado');
            setShowCommentForm(false);
            setReviewText("");
            setRating(5);
            refreshComments();
        } else {
            toast.error('Error al publicar el comentario');
        }
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
                <button
                    style={{
                        background: "#0078d4",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.8rem 2.2rem",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(0,120,212,0.08)",
                        transition: "background 0.2s"
                    }}
                    onClick={handleBuyNow}
                >
                    Comprar ahora
                </button>
            </div>

            <VehicleRating rating={vehicleData.rating} />

            {/* Comentarios y rating */}
            <section className="vehicle-comments">
                <h3 style={{marginBottom: '1rem'}}>Comentarios y valoraciones</h3>
                {loading ? (
                    <div>Cargando comentarios...</div>
                ) : error ? (
                    <div style={{color: 'red'}}>{error}</div>
                ) : vehicleComments.length === 0 ? (
                    <div>No hay comentarios para este vehículo.</div>
                ) : (
                    <div style={{marginBottom: '2rem'}}>
                        {vehicleComments.map(comment => (
                            <div key={comment._id} style={{borderBottom: '1px solid #eee', marginBottom: '1rem', paddingBottom: '1rem'}}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                    <span style={{fontWeight: 600}}>{comment.idCustomer?.firstName ? `${comment.idCustomer.firstName} ${comment.idCustomer.lastName}` : 'Usuario'}</span>
                                    <span style={{color: '#ffd700', fontWeight: 700}}>{'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}</span>
                                </div>
                                <div style={{marginTop: '0.3rem'}}>{comment.reviewText}</div>
                            </div>
                        ))}
                    </div>
                )}
                {showCommentForm ? (
                    <form onSubmit={handleSubmitComment} style={{marginBottom: '2rem'}}>
                        <div style={{marginBottom: '0.5rem'}}>
                            <label>Tu calificación: </label>
                            {[1,2,3,4,5].map(star => (
                                <span
                                    key={star}
                                    style={{fontSize: '1.5rem', color: star <= rating ? '#ffd700' : '#e4e5e9', cursor: 'pointer'}}
                                    onClick={() => setRating(star)}
                                >★</span>
                            ))}
                        </div>
                        <textarea
                            value={reviewText}
                            onChange={e => setReviewText(e.target.value)}
                            placeholder="Escribe tu comentario..."
                            required
                            style={{width: '100%', minHeight: '60px', marginBottom: '0.5rem'}}
                        />
                        <button type="submit" style={{background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', fontWeight: 600}}>Publicar</button>
                        <button type="button" onClick={() => setShowCommentForm(false)} style={{marginLeft: '1rem', background: '#eee', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem'}}>Cancelar</button>
                    </form>
                ) : (
                    <button className="comment-button" onClick={() => setShowCommentForm(true)}>Comentar</button>
                )}
            </section>
        </div>
    );
};

export default VehicleDetails;