"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

export default function UserProfilePage({ onBack }) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    hasPrivileges: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("User data submitted:", userData)
    // Here you would typically send the data to your backend
    onBack()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-medium">Agregar Nuevo Usuario</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombres
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Apellidos
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Teléfono
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <input
              id="hasPrivileges"
              type="checkbox"
              name="hasPrivileges"
              checked={userData.hasPrivileges}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
            />
            <label htmlFor="hasPrivileges" className="text-sm font-medium text-gray-700">
              Privilegios
            </label>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Guardar Usuario
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="User profile"
              className="w-full h-full object-cover"
            />
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
