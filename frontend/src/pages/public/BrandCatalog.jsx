import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarCatalogo from '../../components/public/navbar/NavbarCatalogo';
import VehicleGrid from '../../components/public/Catalogo/VehicleGrid';
import './css/Marcas.css';

// Importamos imágenes de logos para el encabezado
import NissanLogo from "./img/Nissan.png";
import HondaLogo from "./img/Honda.png";
import ToyotaLogo from "./img/Toyota.png";
import LexusLogo from "./img/Lexus.png";
import MitsubishiLogo from "./img/mitsubishi.png";
import KiaLogo from "./img/kialogo.png";
import SuzukiLogo from "./img/suzukilogo.png";
import HyundaiLogo from "./img/hyundaulogo.png";
import MazdaLogo from "./img/mazdalogo.png";
import SubaruLogo from "./img/subarulogo.png";

const BrandCatalog = () => {
    const { brandName } = useParams();
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mapeo de logos por marca
    const brandLogos = {
        nissan: NissanLogo,
        honda: HondaLogo,
        toyota: ToyotaLogo,
        lexus: LexusLogo,
        mitsubishi: MitsubishiLogo,
        kia: KiaLogo,
        suzuki: SuzukiLogo,
        hyundai: HyundaiLogo,
        mazda: MazdaLogo,
        subaru: SubaruLogo
    };

    // Obtener el logo de la marca actual
    const getBrandLogo = () => {
        const normalizedBrandName = brandName?.toLowerCase();
        return brandLogos[normalizedBrandName] || NissanLogo;
    };

    // Obtener el nombre formateado de la marca
    const getFormattedBrandName = () => {
        if (!brandName) return 'Marca';
        return brandName.charAt(0).toUpperCase() + brandName.slice(1).toLowerCase();
    };

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

    // Estados de carga y error con el nuevo diseño
    if (loading) {
        return (
            <div className="page-container">
                <div className="content-wrap">
                    <main className="marcas-container">
                        <div className="brand-header">
                            <img
                                src={getBrandLogo()}
                                alt={`${getFormattedBrandName()} Logo`}
                                className="brand-catalog-logo"
                            />
                        </div>
                        <div style={{
                            padding: '60px 20px',
                            textAlign: 'center',
                            fontSize: '18px',
                            color: '#666'
                        }}>
                            Cargando vehículos...
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container">
                <div className="content-wrap">
                    <main className="marcas-container">
                        <div className="brand-header">
                            <img
                                src={getBrandLogo()}
                                alt={`${getFormattedBrandName()} Logo`}
                                className="brand-catalog-logo"
                            />
                        </div>
                        <div style={{
                            padding: '60px 20px',
                            textAlign: 'center',
                            fontSize: '18px',
                            color: '#ef4444',
                            fontWeight: '600'
                        }}>
                            {error}
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    if (getFilteredCars().length === 0) {
        return (
            <div className="page-container">
                <div className="content-wrap">
                    
                    <main className="marcas-container">
                        <div className="brand-header">
                            <img
                                src={getBrandLogo()}
                                alt={`${getFormattedBrandName()} Logo`}
                                className="brand-catalog-logo"
                            />
                        </div>

                        <NavbarCatalogo
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            categories={getCategories()}
                        />

                        <div className="no-results">
                            No hay vehículos disponibles para esta categoría.
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="content-wrap">
                <main className="marcas-container">
                    {/* Header con logo de la marca */}
                    <div className="brand-header">
                        <img
                            src={getBrandLogo()}
                            alt={`${getFormattedBrandName()} Logo`}
                            className="brand-catalog-logo"
                        />
                    </div>

                    {/* Navbar de categorías */}
                    <NavbarCatalogo
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        categories={getCategories()}
                    />

                    {/* Grid de vehículos */}
                    <VehicleGrid
                        vehicles={getFilteredCars()}
                        brandName={getFormattedBrandName()}
                    />
                </main>
            </div>
        </div>
    );
};

export default BrandCatalog;