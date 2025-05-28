"use client"

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-white border-b flex justify-between items-center px-6 py-3">
      <div className="flex space-x-6">
        <button
          className={`py-2 ${activeTab === "general" ? "text-black font-medium" : "text-gray-500"}`}
          onClick={() => setActiveTab("general")}
        >
          Descripcion General
        </button>
        <button
          className={`py-2 ${activeTab === "compras" ? "text-black font-medium" : "text-gray-500"}`}
          onClick={() => setActiveTab("compras")}
        >
          Compras
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-700">Kevin Josue</span>
        <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
          <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  )
}
