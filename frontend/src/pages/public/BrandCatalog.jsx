import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarCatalogo from '../../components/public/navbar/NavbarCatalogo';
import VehicleGrid from '../../components/public/Catalogo/VehicleGrid';

const BrandCatalog = () => {
    const { brandName } = useParams();
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`http://localhost:4000/api/Rvehicles/by-brand?brand=${brandName}`)
            .then(res => res.json())
            .then(data => {
                console.log("Vehículos recibidos:", data);
                if (Array.isArray(data)) {
                    setVehicles(data);
                } else {
                    setVehicles([]);
                    setError("Error: Respuesta inesperada del servidor.");
                }
                setLoading(false);
            })
            .catch(() => {
                setVehicles([]);
                setError("No se pudo conectar con el servidor.");
                setLoading(false);
            });
    }, [brandName]);

    const getCategories = () => {
        const categories = new Set(['Todos']);
        vehicles.forEach(car => {
            if (car.idBodyWork && car.idBodyWork.bodyWork) {
                categories.add(car.idBodyWork.bodyWork);
            }
        });
        return Array.from(categories);
    };

    const getFilteredCars = () => {
        const filtered = activeCategory === 'Todos'
            ? vehicles
            : vehicles.filter(car => car.idBodyWork && car.idBodyWork.bodyWork === activeCategory);
        console.log("Filtrados:", filtered, "Categoría activa:", activeCategory);
        return filtered;
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div style={{ padding: 40, textAlign: 'center', color: '#ef4444', fontWeight: 700 }}>{error}</div>;
    if (getFilteredCars().length === 0) {
        return <div style={{ padding: 40, textAlign: 'center', color: '#ef4444', fontWeight: 700 }}>No hay vehículos para esta marca.</div>;
    }

    return (
        <div>
            <NavbarCatalogo
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={getCategories()}
            />
            <VehicleGrid vehicles={getFilteredCars()} brandName={brandName} />
        </div>
    );
};

export default BrandCatalog;