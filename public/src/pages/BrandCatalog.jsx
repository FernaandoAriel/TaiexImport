// BrandCatalog.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './css/Marcas.css';
import NavbarCatalogo from '../components/navbar/NavbarCatalogo';

// Importamos imágenes de logos para el encabezado
import NissanLogo from "../pages/img/Nissan.png";
import HondaLogo from "../pages/img/Honda.png";
import ToyotaLogo from "../pages/img/Toyota.png";
import LexusLogo from "../pages/img/Lexus.png";
import MitsubishiLogo from "../pages/img/mitsubishi.png";

const BrandCatalog = () => {
    const { brandName } = useParams();
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [brandData, setBrandData] = useState({
        name: '',
        logo: null,
        cars: []
    });

    // Base de datos de vehículos por marca
    const brandsDatabase = {
        nissan: {
            name: 'Nissan',
            logo: NissanLogo,
            cars: [
                {
                    id: 1,
                    name: "Nuevo Nissan Versa",
                    description: "Desafiamos nuevos límites",
                    category: "Sedan",
                    image: "https://example.com/versa.jpg"
                },
                {
                    id: 2,
                    name: "Sentra",
                    description: "Conoce a tu par",
                    category: "Sedan",
                    image: "https://example.com/sentra.jpg"
                },
                {
                    id: 3,
                    name: "March",
                    description: "Compacto y eficiente",
                    category: "Hatchback",
                    image: "https://example.com/march.jpg"
                },
                {
                    id: 4,
                    name: "Qashqai",
                    description: "Conducción más segura",
                    category: "SUV",
                    image: "https://example.com/qashqai.jpg"
                },
                {
                    id: 5,
                    name: "Pathfinder",
                    description: "Elige quien traza el rumbo",
                    category: "SUV",
                    image: "https://example.com/pathfinder.jpg"
                },
                {
                    id: 6,
                    name: "Frontier",
                    description: "Potencia y rendimiento",
                    category: "PickUp",
                    image: "https://example.com/frontier.jpg"
                }
            ]
        },
        honda: {
            name: 'Honda',
            logo: HondaLogo,
            cars: [
                {
                    id: 1,
                    name: "Civic",
                    description: "Innovación constante",
                    category: "Sedan",
                    image: "https://example.com/civic.jpg"
                },
                {
                    id: 2,
                    name: "Civic Type R",
                    description: "Deportividad máxima",
                    category: "Hatchback",
                    image: "https://example.com/civic-type-r.jpg"
                },
                {
                    id: 3,
                    name: "Accord",
                    description: "Elegancia y prestaciones",
                    category: "Sedan",
                    image: "https://example.com/accord.jpg"
                },
                {
                    id: 4,
                    name: "CR-V",
                    description: "Versatilidad premium",
                    category: "SUV",
                    image: "https://example.com/crv.jpg"
                },
                {
                    id: 5,
                    name: "HR-V",
                    description: "Compacto y espacioso",
                    category: "SUV",
                    image: "https://example.com/hrv.jpg"
                },
                {
                    id: 6,
                    name: "Pilot",
                    description: "Potencia familiar",
                    category: "SUV",
                    image: "https://example.com/pilot.jpg"
                }
            ]
        },
        toyota: {
            name: 'Toyota',
            logo: ToyotaLogo,
            cars: [
                {
                    id: 1,
                    name: "Corolla",
                    description: "Eficiencia y confiabilidad",
                    category: "Sedan",
                    image: "https://example.com/corolla.jpg"
                },
                {
                    id: 2,
                    name: "Camry",
                    description: "Lujo y confort",
                    category: "Sedan",
                    image: "https://example.com/camry.jpg"
                },
                {
                    id: 3,
                    name: "RAV4",
                    description: "Aventura y versatilidad",
                    category: "SUV",
                    image: "https://example.com/rav4.jpg"
                },
                {
                    id: 4,
                    name: "Hilux",
                    description: "Resistencia incomparable",
                    category: "PickUp",
                    image: "https://example.com/hilux.jpg"
                },
                {
                    id: 5,
                    name: "Highlander",
                    description: "Espacio y tecnología",
                    category: "SUV",
                    image: "https://example.com/highlander.jpg"
                }
            ]
        },
        lexus: {
            name: 'Lexus',
            logo: LexusLogo,
            cars: [
                {
                    id: 1,
                    name: "IS",
                    description: "Deportividad premium",
                    category: "Sedan",
                    image: "https://example.com/is.jpg"
                },
                {
                    id: 2,
                    name: "ES",
                    description: "Lujo excepcional",
                    category: "Sedan",
                    image: "https://example.com/es.jpg"
                },
                {
                    id: 3,
                    name: "NX",
                    description: "Sofisticación urbana",
                    category: "SUV",
                    image: "https://example.com/nx.jpg"
                },
                {
                    id: 4,
                    name: "RX",
                    description: "Innovación de lujo",
                    category: "SUV",
                    image: "https://example.com/rx.jpg"
                }
            ]
        },
        mitsubishi: {
            name: 'Mitsubishi',
            logo: MitsubishiLogo,
            cars: [
                {
                    id: 1,
                    name: "Mirage",
                    description: "Economía y eficiencia",
                    category: "Hatchback",
                    image: "https://example.com/mirage.jpg"
                },
                {
                    id: 2,
                    name: "Eclipse Cross",
                    description: "Diseño atrevido",
                    category: "SUV",
                    image: "https://example.com/eclipse-cross.jpg"
                },
                {
                    id: 3,
                    name: "Outlander",
                    description: "Estilo renovado",
                    category: "SUV",
                    image: "https://example.com/outlander.jpg"
                },
                {
                    id: 4,
                    name: "L200",
                    description: "Robustez y funcionalidad",
                    category: "PickUp",
                    image: "https://example.com/l200.jpg"
                }
            ]
        }
    };

    // Actualizar la marca basado en el parámetro de URL
    useEffect(() => {
        if (!brandName) return;

        const normalizedBrandName = brandName.toLowerCase();

        if (brandsDatabase[normalizedBrandName]) {
            setBrandData(brandsDatabase[normalizedBrandName]);
        } else {
            // Fallback a Nissan si la marca no existe
            setBrandData(brandsDatabase.nissan);
        }

        // Reset active category when brand changes
        setActiveCategory('Todos');
    }, [brandName]);

    // Obtener todas las categorías disponibles para esta marca
    const getCategories = () => {
        const categories = new Set(['Todos']);
        brandData.cars.forEach(car => {
            categories.add(car.category);
        });
        return Array.from(categories);
    };

    // Función para filtrar los vehículos
    const getFilteredCars = () => {
        if (activeCategory === 'Todos') return brandData.cars;
        return brandData.cars.filter(car => car.category === activeCategory);
    };

    return (
        <div className="page-container">
            <div className="content-wrap">
                <main className="marcas-container">
                    <div className="brand-header">
                        {brandData.logo && (
                            <img
                                src={brandData.logo}
                                alt={`${brandData.name} Logo`}
                                className="brand-catalog-logo"
                            />
                        )}
                    </div>

                    <NavbarCatalogo
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        categories={getCategories()}
                    />

                    <div className="marcas-grid">
                        {getFilteredCars().map(car => (
                            <div key={car.id} className="marca-card">
                                <div className="car-image-placeholder">
                                    <div className="image-replacement">{car.name.charAt(0)}</div>
                                </div>
                                <h3>{car.name}</h3>
                                <p>{car.description}</p>
                                <span className="car-category">{car.category}</span>
                                <Link to={`/marcas/${brandName}/${car.id}`} className="vehicle-button">Conoce más →</Link>
                            </div>
                        ))}
                    </div>

                    {getFilteredCars().length === 0 && (
                        <div className="no-results">
                            No hay vehículos disponibles en esta categoría.
                        </div>
                    )}
                </main>
            </div>

            <footer className="marcas-footer">
                <p>© {new Date().getFullYear()} Catálogo {brandData.name} - Todos los derechos reservados</p>
            </footer>
        </div>
    );
};


export default BrandCatalog;