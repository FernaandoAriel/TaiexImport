// src/pages/purchases-page.jsx
import BrandsList from "../components/brand/brands-list.jsx"
import TopCarsList from "../components/brand/top-cars-list.jsx"

export default function PurchasesPage() {
  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col overflow-hidden p-6">
        <h2 className="text-xl font-medium mb-6">Gestión de Marcas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium text-red-600 mb-6">Mas Comprados</h2>
            <BrandsList />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium text-red-600 mb-6">Top Carros Vendidos</h2>
            <TopCarsList />
          </div>
        </div>
      </div>
    </div>
  )
}