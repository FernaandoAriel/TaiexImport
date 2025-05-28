// src/pages/sales-page.jsx
"use client"

import { Edit, Trash, FileText, Download } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/sidebar.jsx"

export default function SalesPage() {
  const navigate = useNavigate()
  
  const sales = [
    {
      id: 1,
      date: "15/05/2023",
      customer: "Carlos Martínez",
      vehicle: "NISSAN SENTRA",
      price: "$27,900",
      salesperson: "Jonathan Valle",
      status: "Completada",
      paymentMethod: "Financiamiento",
    },
    {
      id: 2,
      date: "22/05/2023",
      customer: "María González",
      vehicle: "TOYOTA COROLLA",
      price: "$29,500",
      salesperson: "Kevin Arce",
      status: "Completada",
      paymentMethod: "Contado",
    },
    {
      id: 3,
      date: "01/06/2023",
      customer: "Roberto Sánchez",
      vehicle: "HONDA CIVIC",
      price: "$31,200",
      salesperson: "Jonathan Valle",
      status: "En proceso",
      paymentMethod: "Financiamiento",
    },
    {
      id: 4,
      date: "10/06/2023",
      customer: "Ana Rodríguez",
      vehicle: "NISSAN KICKS",
      price: "$25,800",
      salesperson: "Kevin Arce",
      status: "Completada",
      paymentMethod: "Contado",
    },
    {
      id: 5,
      date: "18/06/2023",
      customer: "Luis Hernández",
      vehicle: "MITSUBISHI OUTLANDER",
      price: "$35,700",
      salesperson: "Jonathan Valle",
      status: "En proceso",
      paymentMethod: "Financiamiento",
    },
  ]

  const handleEditSale = (sale) => {
    navigate(`/sales/edit/${sale.id}`)
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col overflow-hidden p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Gestión de Ventas</h2>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                <FileText size={16} />
                <span>Reporte</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                <Download size={16} />
                <span>Exportar</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Fecha</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Cliente</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Vehículo</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Precio</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Vendedor</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Estado</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Método de Pago</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id} className="border-b">
                      <td className="py-3 px-4">{sale.date}</td>
                      <td className="py-3 px-4">{sale.customer}</td>
                      <td className="py-3 px-4">{sale.vehicle}</td>
                      <td className="py-3 px-4">{sale.price}</td>
                      <td className="py-3 px-4">{sale.salesperson}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            sale.status === "Completada" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {sale.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{sale.paymentMethod}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="p-1 rounded-full bg-black text-white" onClick={() => handleEditSale(sale)}>
                            <Edit size={16} />
                          </button>
                          <button className="p-1 rounded-full bg-black text-white">
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}