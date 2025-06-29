import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });
    const { user } = useAuth();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Limpiar carrito al cerrar sesión
    useEffect(() => {
        if (!user) {
            setCart([]);
            localStorage.removeItem('cart');
        }
    }, [user]);

    const addToCart = (vehicle) => {
        if (!cart.some(item => item.id === vehicle.id && item.brandName === vehicle.brandName)) {
            setCart([...cart, vehicle]);
        }
    };

    const removeFromCart = (vehicleId, brandName) => {
        setCart(cart.filter(
            item => !(item.id === vehicleId && item.brandName === brandName)
        ));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);