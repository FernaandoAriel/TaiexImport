import { useEffect, useState } from "react";
import useTopVehicles from "./hooks/useTopCars";

export default function TopCarsList() {
  const { topVehicles, loading, error, refreshData } = useTopVehicles();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Cargando vehículos más vendidos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={refreshData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (topVehicles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No hay ventas registradas aún</p>
      </div>
    );
  }

  return (
    <div className="space-y-6"
    style={{
      marginLeft: "20px",
      marginRight: "20px",
      
      marginTop: "10px",
    }}>
      {topVehicles.map((vehicle, index) => (
        <div key={vehicle._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          
          marginTop: "10px",
        }}>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded overflow-hidden"style={{
          marginLeft: "20px",
          marginRight: "20px",
          
          marginTop: "10px",
        }}>
              {vehicle.image ? (
                <img 
                  src={vehicle.image} 
                  alt={vehicle.vehicleName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  Sin imagen
                </div>
              )}
            </div>
            <div>
              <span className="font-medium text-gray-800 block">
                {vehicle.vehicleName}
              </span>
              <span className="text-sm text-gray-500">
                ${vehicle.price?.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-blue-600">
              {vehicle.totalSales}
            </span>
            <span className="text-sm text-gray-600 block">
              {vehicle.totalSales === 1 ? 'Venta' : 'Ventas'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}