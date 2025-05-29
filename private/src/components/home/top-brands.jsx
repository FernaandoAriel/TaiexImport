// src/components/TopBrandsCard.jsx
import useTopBrands from "./hooks/useTopBrand";

export default function TopBrandsCard() {
    const { topBrands, loading, error } = useTopBrands();

    if (loading) return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Cargando marcas...</h2>
        </div>
    );

    if (error) return (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error}</p>
        </div>
    );

    if (!topBrands || topBrands.length === 0) return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Marcas más vendidas</h2>
            <p>No hay datos disponibles</p>
        </div>
    );

    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Marcas más vendidas</h2>
            
            <div className="space-y-3">
                {topBrands.map((brand, index) => (
                    <div 
                        key={brand._id} 
                        className="flex items-center justify-between bg-blue-400 bg-opacity-30 p-3 rounded-lg"
                    >
                        <div className="flex items-center space-x-3">
                            {/* Posición */}
                            <div className="w-8 h-8 flex items-center justify-center bg-white text-blue-600 font-bold rounded-full">
                                {index + 1}
                            </div>
                            
                            {/* Imagen de la marca */}
                            {brand.image && (
                                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full overflow-hidden">
                                    <img 
                                        src={brand.image} 
                                        alt={brand.brand} 
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            )}
                            
                            {/* Nombre de la marca */}
                            <div>
                                <p className="font-bold">{brand.brand}</p>
                                <p className="text-blue-100 text-sm">{brand.salesCount} ventas</p>
                            </div>
                        </div>
                        
                        {/* Medalla para el top 3 */}
                        {index < 3 && (
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                index === 0 ? "bg-yellow-400" : 
                                index === 1 ? "bg-gray-300" : 
                                "bg-amber-700"
                            }`}>
                                <span className="text-white font-bold">
                                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}