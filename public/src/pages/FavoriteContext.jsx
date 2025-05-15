// FavoritesContext.jsx
import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (vehicle) => {
        // Verificar si el vehículo ya está en favoritos
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