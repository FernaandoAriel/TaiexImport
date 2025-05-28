"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"

export default function EditSalePage({ sale, onBack }) {
  const [saleData, setSaleData] = useState({
    date: "",
    customer: "",
    vehicle: "",
    price: "",
    salesperson: "",
    status: "",
    paymentMethod: "",
    notes: "",
  })

  // Initialize form with sale data when component mounts or sale changes
  useEffect(() => {
    if (sale) {
      // Format date from DD/MM/YYYY to YYYY-MM-DD for input type="date"
      const dateParts = sale.date ? sale.date.split("/") : ["", "", ""]
      const formattedDate = dateParts.length === 3 ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}` : ""

      setSaleData({
        date: formattedDate,
        customer: sale.customer || "",
        vehicle: sale.vehicle || "",
        price: sale.price || "",
        salesperson: sale.salesperson || "",
        status: sale.status || "",
        paymentMethod: sale.paymentMethod || "",
        notes: sale.notes || "",
      })
    }
  }, [sale])

  const handleChange = (e) => {
    const { name, value } = e.target
    setSaleData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Updated sale data:", saleData)
    // Here you would typically send the data to your backend
    onBack()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-medium">Editar Venta</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={saleData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
              Cliente
            </label>
            <input
              id="customer"
              type="text"
              name="customer"
              value={saleData.customer}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-1">
              Vehículo
            </label>
            <select
              id="vehicle"
              name="vehicle"
              value={saleData.vehicle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Seleccionar vehículo</option>
              <option value="NISSAN SENTRA">NISSAN SENTRA</option>
              <option value="NISSAN KICKS">NISSAN KICKS</option>
              <option value="NISSAN QASHQAI">NISSAN QASHQAI</option>
              <option value="TOYOTA COROLLA">TOYOTA COROLLA</option>
              <option value="HONDA CIVIC">HONDA CIVIC</option>
              <option value="MITSUBISHI OUTLANDER">MITSUBISHI OUTLANDER</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <input
              id="price"
              type="text"
              name="price"
              value={saleData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="salesperson" className="block text-sm font-medium text-gray-700 mb-1">
              Vendedor
            </label>
            <select
              id="salesperson"
              name="salesperson"
              value={saleData.salesperson}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Seleccionar vendedor</option>
              <option value="Jonathan Valle">Jonathan Valle</option>
              <option value="Kevin Arce">Kevin Arce</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              id="status"
              name="status"
              value={saleData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="En proceso">En proceso</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
              Método de Pago
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={saleData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Financiamiento">Financiamiento</option>
              <option value="Contado">Contado</option>
              <option value="Leasing">Leasing</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notas
            </label>
            <textarea
              id="notes"
              name="notes"
              value={saleData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  )
}
