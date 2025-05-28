// useTopBrand.js
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const API_TOP_BRAND = "http://localhost:4000/api/Rbrand";

const useTopBrand = () => {
    const [topBrand, setTopBrand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useTopBrand.js
const fetchTopBrand = async () => {
    try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/api/Rbrand");
        
        if (!response.ok) throw new Error("Error en la respuesta");
        
        const data = await response.json();
        
        // Depuración: ver qué recibe realmente el frontend
        console.log("Datos recibidos:", data);
        
        // Asegúrate de mapear correctamente los campos
        const formattedData = {
            brandName: data.brand || data.brandName || data.nombreMarca || 'Desconocida',
            totalSales: data.totalSales || data.ventas || data.count || 0
        };
        
        setTopBrand(formattedData);
    } catch (err) {
        console.error("Error details:", {
            message: err.message,
            stack: err.stack
        });
        setError("No se pudo obtener la marca más vendida");
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchTopBrand();
    }, []);

    const refreshData = () => {
        fetchTopBrand();
    };

    return {
        topBrand,
        loading,
        error,
        refreshData
    };
};

export default useTopBrand;