// src/pages/home.jsx
import { useState } from "react"

//components
import Header from "../components/header.jsx"
import SalesChart from "../components/sales-chart.jsx"
import TopBrands from "../components/top-brands.jsx"
import TopModels from "../components/top-models.jsx"
import Comments from "../components/comments.jsx"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-y-auto p-4">
          {activeTab === "general" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-medium text-red-600 mb-4 text-center">Predicciones</h2>
                <SalesChart />
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium text-red-600">Top Ventas</h2>
                  <button className="text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </button>
                </div>
                <TopBrands />
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium text-red-600">Comentarios</h2>
                  <span className="text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </span>
                </div>
                <Comments />
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium text-red-600">Mas Comprados</h2>
                  <span className="text-gray-500">$</span>
                </div>
                <TopModels />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-medium text-red-600 mb-6">Compras</h2>
              <p>Contenido de la pestaña de compras</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}