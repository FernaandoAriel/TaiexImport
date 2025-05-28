// src/pages/sales-page.jsx
"use client"

import { useNavigate } from "react-router-dom"
import Sidebar from "../components/sidebar.jsx"
import SalesTable from "../components/sales/sales.jsx"

export default function SalesPage() {
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
      date: "20/05/2023",
      customer: "Ana López",
      vehicle: "TOYOTA COROLLA",
      price: "$22,500",
      salesperson: "María Pérez",
      status: "Pendiente",
      paymentMethod: "Contado",
    },
    {
      id: 3,
      date: "25/05/2023",
      customer: "Luis García",
      vehicle: "FORD FOCUS",
      price: "$19,800",
      salesperson: "Pedro Sánchez",
      status: "Completada",
      paymentMethod: "Financiamiento",
    },]

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col overflow-hidden p-6">
        <SalesTable sales={sales} />
      </div>
    </div>
  )
}