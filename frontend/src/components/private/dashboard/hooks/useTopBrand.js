// src/hooks/useTopBrands.js
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const API_TOP_BRANDS = "http://localhost:4000/api/Rbrand/top-brand";

const useTopBrands = () => {
    const [topBrands, setTopBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTopBrands = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_TOP_BRANDS);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setTopBrands(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching top brands:", err);
            setError(err.message);
            toast.error("Error al obtener las marcas más vendidas");
            setTopBrands([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopBrands();
    }, []);

    return { topBrands, loading, error, refresh: fetchTopBrands };
};

export default useTopBrands;