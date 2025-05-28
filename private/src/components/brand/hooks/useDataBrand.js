import { useState } from "react";
import { toast } from "react-hot-toast";

const API = "http://localhost:4000/api/Rbrand";

const useDataBrand = () => {
    const [id, setId] = useState(null);
    const [brand, setBrand] = useState("");
    const [image, setImage] = useState("");

    const cleanData = () => {
        setId(null);
        setBrand("");
        setImage("");
    };

    const setBrandToEdit = (brandData) => {
        if (!brandData) {
            cleanData();
            return;
        }

        setId(brandData._id || null);
        setBrand(brandData.brand || "");
        setImage(brandData.image || "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!brand.trim()) {
            toast.error("El nombre de la marca es requerido");
            return false;
        }

        const method = id ? "PUT" : "POST";
        const url = id ? `${API}/${id}` : API;

        const data = {
            brand: brand.trim(),
            image: image.trim()
        };

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            toast.success(id ? "Marca actualizada correctamente" : "Marca creada correctamente");
            cleanData();
            return result;
        } catch (error) {
            console.error("Error saving brand:", error);
            toast.error(error.message || "Error al guardar la marca");
            return false;
        }
    };

    return {
        id,
        brand,
        image,
        setBrand,
        setImage,
        setBrandToEdit,
        handleSubmit,
        cleanData
    };
};

export default useDataBrand;