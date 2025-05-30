// useTopVehicles.js
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const API_TOP_VEHICLES = "http://localhost:4000/api/Rsales/top-vehicles";

const useTopVehicles = () => {
    const [topVehicles, setTopVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTopVehicles = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_TOP_VEHICLES);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log("Top vehicles data:", data);
            
            setTopVehicles(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            console.error("Error fetching top vehicles:", err);
            setError("No se pudieron obtener los vehículos más vendidos");
            toast.error("Error al cargar vehículos más vendidos");
            setTopVehicles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopVehicles();
    }, []);

    const refreshData = () => {
        fetchTopVehicles();
    };

    return {
        topVehicles,
        loading,
        error,
        refreshData
    };
};

export default useTopVehicles;