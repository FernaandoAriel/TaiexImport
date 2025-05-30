import useSales from "./hooks/useSales";
import { useEffect, useState } from "react";

export default function TopCarsList() {
  const { sales, loading, error } = useSales();
  const [topCars, setTopCars] = useState([]);

  useEffect(() => {
    if (sales.length > 0) {
      // Contar las ventas por vehículo
      const carCounts = sales.reduce((acc, sale) => {
        if (sale.idVehicle && sale.idVehicle.modelo) {
          const model = sale.idVehicle.modelo;
          acc[model] = (acc[model] || 0) + 1;
        }
        return acc;
      }, {});

      // Convertir a array y ordenar
      const sortedCars = Object.entries(carCounts)
        .map(([name, purchases]) => ({
          name,
          purchases,
          image: "/placeholder.svg?height=60&width=120" // Imagen por defecto
        }))
        .sort((a, b) => b.purchases - a.purchases);

      setTopCars(sortedCars);
    }
  }, [sales]);

  if (loading) return <div>Cargando ventas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      {topCars.map((car, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-12">
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-full object-contain" 
              />
            </div>
            <span className="font-medium text-gray-800">{car.name}</span>
          </div>
          <span className="text-gray-600">{car.purchases} Compras</span>
        </div>
      ))}
    </div>
  );
}