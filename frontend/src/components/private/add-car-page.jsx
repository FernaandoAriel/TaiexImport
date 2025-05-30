"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

export default function AddCarPage({ onBack }) {
  const [carData, setCarData] = useState({
    model: "",
    year: "",
    price: "",
    details: "",
    equipment: "",
    compatibleKits: "",
    discount: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCarData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Car data submitted:", carData)
    // Here you would typically send the data to your backend
    onBack()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-medium">Agregar Nuevo Vehículo</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Modelo
            </label>
            <input
              id="model"
              type="text"
              name="model"
              value={carData.model}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Año
            </label>
            <input
              id="year"
              type="text"
              name="year"
              value={carData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <input
              id="price"
              type="text"
              name="price"
              value={carData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
              Detalles
            </label>
            <input
              id="details"
              type="text"
              name="details"
              value={carData.details}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-1">
              Equipamiento
            </label>
            <input
              id="equipment"
              type="text"
              name="equipment"
              value={carData.equipment}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="compatibleKits" className="block text-sm font-medium text-gray-700 mb-1">
              Kits Compatibles
            </label>
            <input
              id="compatibleKits"
              type="text"
              name="compatibleKits"
              value={carData.compatibleKits}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
              Descuento
            </label>
            <input
              id="discount"
              type="text"
              name="discount"
              value={carData.discount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Guardar Vehículo
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-48 md:h-64 bg-gray-200 rounded-md mb-4 overflow-hidden">
            <img src="/placeholder.svg?height=300&width=500" alt="Car preview" className="w-full h-full object-cover" />
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Subir Foto
          </button>
        </div>
      </form>
    </div>
  )
}
