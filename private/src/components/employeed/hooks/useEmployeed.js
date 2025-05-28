import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const API = "http://localhost:4000/api/Ruser";

const useEmployeed = () => {
    const [employeed, setEmployeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [employeedToEdit, setEmployeedToEdit] = useState(null);

    const fetchEmployeed = async () => {
        try {
            setLoading(true);
            const response = await fetch(API, { headers: { Accept: "application/json" } });
            if (!response.ok) {
                throw new Error("Error al obtener los empleados");
            }

            const text = await response.text();
            if (text.startsWith("<!DOCTYPE html>")) {
                throw new Error("Error de servidor al obtener los empleados");
            }

            const data = JSON.parse(text);
            setEmployeed(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching employeed:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployeed();
    }, []);

    const deleteEmployeed = async (id) => {
        try {
            const response = await fetch(`${API}/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("Error al eliminar el empleado");
            }

            setEmployeed(employeed.filter(emp => emp._id !== id));
            toast.success("Empleado eliminado correctamente");
        } catch (err) {
            console.error("Error deleting employeed:", err);
            toast.error("Error al eliminar el empleado");
        }
    };

    const selectEmployeedToEdit = (employeed) => {
        setEmployeedToEdit(employeed);
    };

    const refreshEmployeed = () => {
        fetchEmployeed();
    };

    return {
        employeed,
        loading,
        error,
        employeedToEdit,
        fetchEmployeed,
        deleteEmployeed,
        selectEmployeedToEdit,
        refreshEmployeed
    };
};

export default useEmployeed;