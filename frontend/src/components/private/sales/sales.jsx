"use client";

import { Edit, Trash, Download, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useSales from "./hooks/useSales.js";
import EditSalePage from "./edit-sale-page.jsx";

export default function SalesTable({ showHeader = true, showActions = true }) {
  const { sales, loading, error, deleteSale, fetchSales } = useSales();
  const [processedSales, setProcessedSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [options, setOptions] = useState({
    customers: [],
    vehicles: [],
    employees: [],
    loadingOptions: true,
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setOptions((prev) => ({ ...prev, loadingOptions: true }));

        const [customersRes, vehiclesRes, employeesRes] = await Promise.all([
          fetch("http:localhost:4000/api/Rcustomers"),
          fetch("http:localhost:4000/api/Rvehicles"),
          fetch("http:localhost:4000/api/Ruser"),
        ]);

        let vehiclesData = [];
        if (vehiclesRes.ok) {
          vehiclesData = await vehiclesRes.json();
          if (!Array.isArray(vehiclesData)) {
            console.error("Datos de vehículos no son un array:", vehiclesData);
            toast.error("Formato inválido para vehículos");
          }
        } else {
          const errorData = await vehiclesRes.json();
          console.error("Error en respuesta de vehículos:", errorData);
          toast.error(`Error al cargar vehículos: ${vehiclesRes.status}`);
        }

        setOptions({
          customers: customersRes.ok ? await customersRes.json() : [],
          vehicles: Array.isArray(vehiclesData) ? vehiclesData : [],
          employees: employeesRes.ok ? await employeesRes.json() : [],
          loadingOptions: false,
        });
      } catch (error) {
        console.error("Error loading options:", error);
        toast.error("Error al cargar datos de opciones");
        setOptions({
          customers: [],
          vehicles: [],
          employees: [],
          loadingOptions: false,
        });
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (Array.isArray(sales)) {
      const processed = sales.map((sale) => {
        const customer = sale.idCustomer || {};
        const vehicle = sale.idVehicle || {};

        return {
          id: sale._id,
          customer:
            `${customer.nombre || customer.firstName || ""} ${
              customer.apellido || customer.lastName || ""
            }`.trim() || "Cliente no disponible",
          vehicle:
            `${vehicle.marca || ""} ${vehicle.modelo || ""}`.trim() ||
            "Vehículo no disponible",
          price: vehicle?.price
            ? `$${vehicle.price.toLocaleString()}`
            : "Precio no disponible",
          status: sale.Estado || "Pendiente",
          rawData: sale,
        };
      });
      setProcessedSales(processed);
    }
  }, [sales]);

  const handleEditSale = (sale) => {
    console.log("Editando venta:", sale.rawData);  
    setSelectedSale(sale.rawData);
    setShowEditModal(true);
  };

  const handleSaveSale = async (updatedSale) => {
    try {
      const response = await fetch(
        `http:localhost:4000/api/Rsales/${updatedSale._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idVehicle: updatedSale.idVehicle,
            idCustomer: updatedSale.idCustomer,
            Estado: updatedSale.Estado,
          }),
        }
      );

      if (!response.ok) throw new Error("Error al guardar cambios");

      toast.success("Venta actualizada correctamente");
      fetchSales();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error saving sale:", error);
      toast.error(error.message);
    }
  };

  const handleDeleteSale = async (saleId) => {
    if (window.confirm("¿Eliminar esta venta?")) {
      try {
        await deleteSale(saleId);
        toast.success("Venta eliminada");
        fetchSales();
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  if ((loading && !processedSales.length) || options.loadingOptions) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
        <span className="ml-2">Cargando datos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error: {error}
              <button
                onClick={fetchSales}
                className="ml-2 text-sm font-medium text-red-700 underline hover:text-red-600"
              >
                Reintentar
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex justify-between items-center"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          
          marginTop: "10px",
        }}>
          <h2 className="text-xl font-medium">Gestión de Ventas</h2>
          <button
            onClick={fetchSales}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "10px",
              padding: "5px 10px",
            }}>
            <Download size={16} />
            Actualizar
          </button>
        </div>
      )}

      {showEditModal && selectedSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <EditSalePage
              sale={selectedSale}
              options={options}
              onBack={() => setShowEditModal(false)}
              onSave={handleSaveSale}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        {processedSales.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay ventas registradas</p>
            <button
              onClick={fetchSales}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Recargar datos
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto"style={{
            marginLeft: "20px",
            marginRight: "20px",
            
            marginTop: "10px",
          }}>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Cliente</th>
                  <th className="text-left py-3 px-4">Vehículo</th>
                  <th className="text-left py-3 px-4">Precio</th>
                  <th className="text-left py-3 px-4">Estado</th>
                  {showActions && (
                    <th className="text-left py-3 px-4">Acciones</th>
                  )}
                </tr>
              </thead>
              <tbody >
                {processedSales.map((sale) => (
                  <tr key={sale.id} className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{sale.customer}</td>
                    <td className="py-3 px-4">{sale.vehicle}</td>
                    <td className="py-3 px-4">{sale.price}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          sale.status === "Completada"
                            ? "bg-green-100 text-green-800"
                            : sale.status === "Cancelada"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                    {showActions && (
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditSale(sale)}
                            className="p-1 text-blue-500 hover:text-blue-700"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteSale(sale.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Eliminar"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
