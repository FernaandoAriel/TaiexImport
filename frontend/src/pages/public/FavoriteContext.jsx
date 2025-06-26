import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    // Leer favoritos de localStorage al iniciar
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    });

    // Guardar favoritos en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (vehicle) => {
        if (!favorites.some(fav => fav.id === vehicle.id && fav.brandName === vehicle.brandName)) {
            setFavorites([...favorites, vehicle]);
        }
    };

    const removeFromFavorites = (vehicleId, brandName) => {
        setFavorites(favorites.filter(
            vehicle => !(vehicle.id === vehicleId && vehicle.brandName === brandName)
        ));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);