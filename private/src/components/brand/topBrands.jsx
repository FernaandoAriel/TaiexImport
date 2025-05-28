export default function TopBrandCard({ brands = [] }) {
    // Encuentra la marca con más ventas (ejemplo simplificado)
    const topBrand = Array.isArray(brands) && brands.length > 0
        ? brands.reduce((prev, current) => 
            (prev.salesCount || 0) > (current.salesCount || 0) ? prev : current
          )
        : null;

    if (!topBrand) return null;

    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Marca más vendida</h2>
            <div className="flex items-center space-x-4">
                {topBrand.image && (
                    <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full overflow-hidden">
                        <img 
                            src={topBrand.image} 
                            alt={topBrand.brand} 
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                )}
                <div>
                    <p className="font-bold text-lg">{topBrand.brand}</p>
                    <p className="text-blue-100">Líder en ventas</p>
                </div>
            </div>
        </div>
    );
}