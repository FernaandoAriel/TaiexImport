import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

const API = "http://localhost:4000/api/Rbrand";

const useBrand = () => {
    const [brand, setBrand] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBrand = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(API, { 
                headers: { 
                    "Accept": "application/json" 
                } 
            });
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setBrand(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            console.error("Error fetching brand:", err);
            setError(err.message);
            toast.error("Error al obtener las marcas");
            setBrand([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBrand();
    }, [fetchBrand]);

    const deleteBrand = async (id) => {
        try {
            const response = await fetch(`${API}/${id}`, { 
                method: "DELETE" 
            });
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            setBrand(prev => prev.filter(b => b._id !== id));
            toast.success("Marca eliminada correctamente");
        } catch (err) {
            console.error("Error deleting brand:", err);
            toast.error(err.message || "Error al eliminar la marca");
        }
    };

    return {
        brand,
        loading,
        error,
        deleteBrand,
        refreshBrand: fetchBrand
    };
};

export default useBrand;