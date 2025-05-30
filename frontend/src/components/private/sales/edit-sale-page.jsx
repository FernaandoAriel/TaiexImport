"use client";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

export default function EditSalePage({ sale, options, onBack, onSave }) {
  const [formData, setFormData] = useState({
    idVehicle: "",
    idCustomer: "",
    idSalesperson: "",
    Estado: "Pendiente",
    paymentMethod: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);

  // Inicializar formulario con datos de la venta
  useEffect(() => {
    if (sale) {
      // Extraer IDs de vehículo y cliente
      const vehicleId = sale.idVehicle?._id || sale.idVehicle || "";
      const customerId = sale.idCustomer?._id || sale.idCustomer || "";

      setFormData({
        idVehicle: vehicleId,
        idCustomer: customerId,
        idSalesperson: sale.idSalesperson || "",
        Estado: sale.Estado || "Pendiente",
        paymentMethod: sale.paymentMethod || "",
        notes: sale.notes || ""
      });
    }
  }, [sale]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSave({
        ...formData,
        _id: sale._id
      });
      toast.success("Venta actualizada correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar los cambios");
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener nombre completo
  const getFullName = (person, isCustomer = false) => {
    if (!person) return "";
    
    // Campos para clientes
    if (isCustomer) {
      const firstName = person.nombre || person.firstName || "";
      const lastName = person.apellido || person.lastName || "";
      return `${firstName} ${lastName}`.trim();
    }
    
    // Campos para empleados
    const firstName = person.firstName || "";
    const lastName = person.lastName || "";
    return `${firstName} ${lastName}`.trim();
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={onBack} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          disabled={loading}
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Editar Venta</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo Cliente */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cliente *
            </label>
            <select
              name="idCustomer"
              value={formData.idCustomer}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
              disabled={loading}
            >
              <option value="">Seleccionar cliente</option>
              {options.customers?.map(customer => (
                <option key={customer._id} value={customer._id} className="py-2">
                  {getFullName(customer, true)} - {customer.email || "Sin email"}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {options.customers?.length || 0} clientes disponibles
            </p>
          </div>

          {/* Campo Vehículo */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehículo *
            </label>
            <select
              name="idVehicle"
              value={formData.idVehicle}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
              disabled={loading}
            >
              <option value="">Seleccionar vehículo</option>
              {options.vehicles?.map(vehicle => (
                <option key={vehicle._id} value={vehicle._id} className="py-2">
                  {`${vehicle.marca || "Marca"} ${vehicle.modelo || "Modelo"} - $${(vehicle.price || 0).toLocaleString()}`}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {options.vehicles?.length || 0} vehículos disponibles
            </p>
          </div>

          {/* Campo Vendedor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vendedor
            </label>
            <select
              name="idSalesperson"
              value={formData.idSalesperson}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={loading}
            >
              <option value="">Seleccionar vendedor</option>
              {options.employees?.map(employee => (
                <option key={employee._id} value={employee._id} className="py-2">
                  {getFullName(employee)}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {options.employees?.length || 0} vendedores disponibles
            </p>
          </div>

          {/* Campo Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado *
            </label>
            <select
              name="Estado"
              value={formData.Estado}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
              disabled={loading}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          {/* Campo Método de Pago */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Pago
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={loading}
            >
              <option value="">Seleccionar método</option>
              <option value="Financiamiento">Financiamiento</option>
              <option value="Contado">Contado</option>
              <option value="Leasing">Leasing</option>
            </select>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 text-lg font-medium rounded-lg transition-colors ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </div>
            ) : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}