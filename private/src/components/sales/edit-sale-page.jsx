"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { toast } from "react-hot-toast"

export default function EditSalePage({ sale, options, onBack, onSave }) {
    const [formData, setFormData] = useState({
        idVehicle: "",
        idCustomer: "",
        idSalesperson: "",
        Estado: "Pendiente",
        paymentMethod: "",
        notes: ""
    })

    const [loading, setLoading] = useState(false)

    // Inicializar formulario con datos de la venta
    useEffect(() => {
        if (sale) {
            setFormData({
                idVehicle: sale.idVehicle || sale.id_carros?._id || "",
                idCustomer: sale.idCustomer || sale.id_clientes?._id || "",
                idSalesperson: sale.idSalesperson || "",
                Estado: sale.Estado || "Pendiente",
                paymentMethod: sale.paymentMethod || "",
                notes: sale.notes || ""
            })
        }
    }, [sale])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await onSave({
                ...formData,
                _id: sale._id
            })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    // Función para obtener nombre completo
    const getFullName = (person, isCustomer = false) => {
        if (!person) return ""
        const firstName = isCustomer ? 
            (person.nombre || person.firsName || person.firstName || "") : 
            (person.firstName || "")
        const lastName = isCustomer ? 
            (person.apellido || person.lastName || "") : 
            (person.lastName || "")
        return `${firstName} ${lastName}`.trim()
    }

    // Función para obtener descripción del vehículo
    const getVehicleDescription = (id) => {
        const vehicle = options.vehicles.find(v => v._id === id)
        return vehicle ? 
            `${vehicle.marca} ${vehicle.modelo} (${vehicle.year}) - $${vehicle.precio?.toLocaleString()}` : 
            "Seleccione un vehículo"
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center space-x-4">
                <button 
                    onClick={onBack} 
                    className="p-2 hover:bg-gray-100 rounded-full"
                    disabled={loading}
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-medium">Editar Venta</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campo Cliente */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cliente *
                        </label>
                        <select
                            name="idCustomer"
                            value={formData.idCustomer}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={loading}
                        >
                            <option value="">Seleccionar cliente</option>
                            {options.customers.map(customer => (
                                <option key={customer._id} value={customer._id}>
                                    {getFullName(customer, true)} - {customer.email || customer.telefono || ""}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Vehículo */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Vehículo *
                        </label>
                        <select
                            name="idVehicle"
                            value={formData.idVehicle}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={loading}
                        >
                            <option value="">Seleccionar vehículo</option>
                            {options.vehicles.map(vehicle => (
                                <option key={vehicle._id} value={vehicle._id}>
                                    {`${vehicle.marca} ${vehicle.modelo} (${vehicle.year}) - $${vehicle.precio?.toLocaleString()}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Previsualización del vehículo */}
                    {formData.idVehicle && (
                        <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium mb-1">Detalles del vehículo:</h3>
                            <p className="text-sm">{getVehicleDescription(formData.idVehicle)}</p>
                        </div>
                    )}

                    {/* Campo Vendedor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Vendedor *
                        </label>
                        <select
                            name="idSalesperson"
                            value={formData.idSalesperson}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={loading}
                        >
                            <option value="">Seleccionar vendedor</option>
                            {options.employees.map(employee => (
                                <option key={employee._id} value={employee._id}>
                                    {getFullName(employee)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Estado */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estado *
                        </label>
                        <select
                            name="Estado"
                            value={formData.Estado}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Método de Pago
                        </label>
                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            disabled={loading}
                        >
                            <option value="Financiamiento">Financiamiento</option>
                            <option value="Contado">Contado</option>
                            <option value="Leasing">Leasing</option>
                        </select>
                    </div>

                    {/* Campo Notas */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notas
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white rounded-md ${
                            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    )
}